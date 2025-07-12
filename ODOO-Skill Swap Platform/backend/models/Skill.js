const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['programming', 'design', 'marketing', 'business', 'creative', 'technical', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters'],
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
skillSchema.index({ name: 'text', category: 1 });

module.exports = mongoose.model('Skill', skillSchema); 