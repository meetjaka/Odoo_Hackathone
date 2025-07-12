const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'From user is required']
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'To user is required']
  },
  skillsOffered: [{
    type: String,
    required: [true, 'Skills offered are required'],
    trim: true
  }],
  skillsWanted: [{
    type: String,
    required: [true, 'Skills wanted are required'],
    trim: true
  }],
  message: {
    type: String,
    maxlength: [500, 'Message cannot be more than 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  responseMessage: {
    type: String,
    maxlength: [500, 'Response message cannot be more than 500 characters'],
    default: ''
  },
  completedAt: {
    type: Date
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxlength: [300, 'Review cannot be more than 300 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance
requestSchema.index({ fromUser: 1, status: 1 });
requestSchema.index({ toUser: 1, status: 1 });
requestSchema.index({ status: 1, createdAt: -1 });

// Prevent duplicate pending requests between same users
requestSchema.index({ fromUser: 1, toUser: 1, status: 1 }, { unique: true });

module.exports = mongoose.model('Request', requestSchema); 