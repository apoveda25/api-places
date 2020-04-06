const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  address: String,
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    default: false,
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

placeSchema.statics.validateSlugCount = async function (slug) {
  try {
    const count = await Places.countDocuments({ slug });

    return count > 0 ? false : true;
  } catch (error) {
    return false;
  }
};

placeSchema.plugin(mongoosePaginate);

const Places = mongoose.model("Places", placeSchema);

module.exports = Places;
