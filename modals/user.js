const { default: mongoose } = require("mongoose");

const eventSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true
  },
  angerLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// User model
const User = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
  },
  events: [eventSchema]
}));

module.exports = User