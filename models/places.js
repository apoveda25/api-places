const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number
});

const Places = mongoose.model("Places", placeSchema);

module.exports = Places;
