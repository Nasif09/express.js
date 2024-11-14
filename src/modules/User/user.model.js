const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  email: { type: String, required: [false, 'Email must be given'], trim: true },
  image: { type: String, required: false, default: '/uploads/users/user.png' },
  password: { type: String, required: false },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  //subscription: { type: String, enum: ['Free', 'Premium'], default: 'Free' },
  expiaryDate: { type: Date },
  cars: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Car"
    }
  ]
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);