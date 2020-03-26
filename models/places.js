const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

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

placeSchema.plugin(mongoosePaginate);

const Places = mongoose.model("Places", placeSchema);

module.exports = Places;
