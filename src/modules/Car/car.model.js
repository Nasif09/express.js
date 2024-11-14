const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: { type: String, trim: true },
  modelName: { type: String},
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Car', carSchema);