const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  email: { type: String, required: [true, 'Email must be given'], trim: true },
  image: { type: String, required: false, default: '/uploads/users/user.png' },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  //subscription: { type: String, enum: ['Free', 'Premium'], default: 'Free' },
  expiaryDate: { type: Date },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);