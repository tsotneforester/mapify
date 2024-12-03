const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'marker must have name'],
  },
  icon: {
    type: String,
    required: [true, 'marker must have icon name'],
    lowercase: true,
  },
  coords: {
    type: [Number, Number],
    required: [true, 'Please provide coordinates'],
  },
  author: {
    type: String,
    required: [true, 'marker must have autor name'],
    lowercase: true,
    default: 'tsotne',
  },
});

const Marker = mongoose.model('marker', schema);

module.exports = Marker;
