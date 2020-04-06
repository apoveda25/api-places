const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");
const Places = require("../models/Places");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.post("save", async function (user, next) {
  try {
    const count = await User.countDocuments({});

    if (count == 1) await User.update({ _id: user._id }, { admin: true });

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.virtual("places").get(function () {
  return Places.find({ _user: this._id });
});

userSchema.plugin(bcrypt);

const User = mongoose.model("User", userSchema);

module.exports = User;
