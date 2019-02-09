const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  USER_ID: {
    type: String,
    required: true
  },
  FIRST_NAME: {
    type: String,
    required: true
  },
  LAST_NAME: {
    type: String,
    required: true
  },
  MAIL_ID: {
    type: String,
    required: true
  },
  MOBILE: {
    type: Number,
    required: true
  },
  ROLE: {
    type: String,
    required: true
  },
  PASSWORD: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  DEPT: {
    type: Number,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);