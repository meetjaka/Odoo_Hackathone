const express = require('express');
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 50 } = req.query;
    
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const skills = await Skill.find(filter)
      .sort({ usageCount: -1, name: 1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        skills
      }
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get skill categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Skill.distinct('category');
    
    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get popular skills
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const skills = await Skill.find({ isActive: true })
      .sort({ usageCount: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: {
        skills
      }
    });
  } catch (error) {
    console.error('Get popular skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create new skill (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, description } = req.body;
    
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name and category are required'
      });
    }

    // Check if skill already exists
    const existingSkill = await Skill.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });
    
    if (existingSkill) {
      return res.status(400).json({
        success: false,
        message: 'Skill already exists'
      });
    }

    const skill = new Skill({
      name: name.toLowerCase(),
      category,
      description
    });

    await skill.save();

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: {
        skill
      }
    });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update skill usage count
router.put('/:id/usage', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    skill.usageCount += 1;
    await skill.save();

    res.json({
      success: true,
      message: 'Usage count updated',
      data: {
        skill
      }
    });
  } catch (error) {
    console.error('Update skill usage error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
