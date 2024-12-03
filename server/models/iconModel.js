const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  binData: {
    type: Buffer, // Use Buffer for storing image data directly
    required: true,
  },
  mimetype: String,
  originalname: String,
  size: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: [true, 'marker must have autor name'],
    lowercase: true,
    default: 'tsotne',
  },
});

const Icon = mongoose.model('icon', schema);

module.exports = Icon;
