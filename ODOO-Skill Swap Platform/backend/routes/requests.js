const express = require('express');
const { body, validationResult } = require('express-validator');
const Request = require('../models/Request');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all requests for current user (sent and received)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || '';
    const type = req.query.type || 'all'; // 'sent', 'received', 'all'
    
    const skip = (page - 1) * limit;
    
    let filter = {};
    
    if (type === 'sent') {
      filter.fromUser = req.user._id;
    } else if (type === 'received') {
      filter.toUser = req.user._id;
    } else {
      filter.$or = [
        { fromUser: req.user._id },
        { toUser: req.user._id }
      ];
    }
    
    if (status) {
      filter.status = status;
    }

    const requests = await Request.find(filter)
      .populate('fromUser', 'name avatar rating')
      .populate('toUser', 'name avatar rating')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Request.countDocuments(filter);

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create new request
router.post('/', auth, [
  body('toUserId').isMongoId().withMessage('Valid user ID is required'),
  body('skillsOffered').isArray({ min: 1 }).withMessage('At least one skill offered is required'),
  body('skillsWanted').isArray({ min: 1 }).withMessage('At least one skill wanted is required'),
  body('message').optional().isLength({ max: 500 }).withMessage('Message cannot be more than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { toUserId, skillsOffered, skillsWanted, message = '' } = req.body;
    
    console.log('Creating request:', { toUserId, skillsOffered, skillsWanted, message });

    // Check if target user exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({
        success: false,
        message: 'Target user not found'
      });
    }

    // Prevent self-requests
    if (req.user._id.toString() === toUserId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send request to yourself'
      });
    }

    // Check for existing pending request
    const existingRequest = await Request.findOne({
      fromUser: req.user._id,
      toUser: toUserId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending request with this user'
      });
    }

    const request = new Request({
      fromUser: req.user._id,
      toUser: toUserId,
      skillsOffered,
      skillsWanted,
      message
    });

    await request.save();

    // Populate user details for response
    await request.populate('fromUser', 'name avatar rating');
    await request.populate('toUser', 'name avatar rating');

    res.status(201).json({
      success: true,
      message: 'Request sent successfully',
      data: {
        request
      }
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update request status (accept/reject)
router.put('/:id/status', auth, [
  body('status').isIn(['accepted', 'rejected']).withMessage('Status must be accepted or rejected'),
  body('responseMessage').optional().isLength({ max: 500 }).withMessage('Response message cannot be more than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, responseMessage = '' } = req.body;

    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Only the recipient can update the status
    if (request.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only respond to requests sent to you'
      });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Request has already been processed'
      });
    }

    request.status = status;
    request.responseMessage = responseMessage;
    await request.save();

    // Populate user details for response
    await request.populate('fromUser', 'name avatar rating');
    await request.populate('toUser', 'name avatar rating');

    res.json({
      success: true,
      message: `Request ${status} successfully`,
      data: {
        request
      }
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Complete a request and add rating
router.put('/:id/complete', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().isLength({ max: 300 }).withMessage('Review cannot be more than 300 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { rating, review = '' } = req.body;

    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Only participants can complete the request
    if (request.fromUser.toString() !== req.user._id.toString() && 
        request.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only complete requests you are involved in'
      });
    }

    if (request.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Only accepted requests can be completed'
      });
    }

    request.status = 'completed';
    request.completedAt = new Date();
    request.rating = rating;
    request.review = review;
    await request.save();

    // Update user ratings
    const otherUserId = request.fromUser.toString() === req.user._id.toString() 
      ? request.toUser 
      : request.fromUser;

    const otherUser = await User.findById(otherUserId);
    if (otherUser) {
      const newTotalRatings = otherUser.totalRatings + 1;
      const newRating = ((otherUser.rating * otherUser.totalRatings) + rating) / newTotalRatings;
      otherUser.rating = Math.round(newRating * 10) / 10;
      otherUser.totalRatings = newTotalRatings;
      await otherUser.save();
    }

    // Populate user details for response
    await request.populate('fromUser', 'name avatar rating');
    await request.populate('toUser', 'name avatar rating');

    res.json({
      success: true,
      message: 'Request completed successfully',
      data: {
        request
      }
    });
  } catch (error) {
    console.error('Complete request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get request by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('fromUser', 'name avatar rating')
      .populate('toUser', 'name avatar rating');
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check if user is involved in this request
    if (request.fromUser._id.toString() !== req.user._id.toString() && 
        request.toUser._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only view requests you are involved in'
      });
    }

    res.json({
      success: true,
      data: {
        request
      }
    });
  } catch (error) {
    console.error('Get request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
