const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  unlockedLevel: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model('Progress', ProgressSchema);