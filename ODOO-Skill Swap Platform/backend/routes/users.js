const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all users (with pagination and filters)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const availability = req.query.availability || '';
    const skillsOffered = req.query.skillsOffered || '';
    const skillsWanted = req.query.skillsWanted || '';

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isActive: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { skillsOffered: { $regex: search, $options: 'i' } },
        { skillsWanted: { $regex: search, $options: 'i' } }
      ];
    }

    if (availability) {
      filter.availability = availability;
    }

    if (skillsOffered) {
      filter.skillsOffered = { $regex: skillsOffered, $options: 'i' };
    }

    if (skillsWanted) {
      filter.skillsWanted = { $regex: skillsWanted, $options: 'i' };
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user by name (for URL routing)
router.get('/name/:name', async (req, res) => {
  try {
    const user = await User.findOne({ 
      name: { $regex: decodeURIComponent(req.params.name), $options: 'i' },
      isActive: true 
    }).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get user by name error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Rate a user (after completing a request)
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating, review } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user rating
    const newTotalRatings = user.totalRatings + 1;
    const newRating = ((user.rating * user.totalRatings) + rating) / newTotalRatings;

    user.rating = Math.round(newRating * 10) / 10; // Round to 1 decimal place
    user.totalRatings = newTotalRatings;
    await user.save();

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      data: {
        user: user.toPublicJSON()
      }
    });
  } catch (error) {
    console.error('Rate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
