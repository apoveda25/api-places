const jwt = require("jsonwebtoken");
const User = require("../models/Users");

class SessionsController {
  static generateToken(req, res, next) {
    if (!req.user) return next();

    req.token = jwt.sign({ id: req.user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1800s",
    });

    next();
  }

  static sendToken(req, res) {
    req.user
      ? res.json({ user: req.user, token: req.token })
      : res.status(422).json({ error: "Could not create user" });
  }

  static async authenticate(req, res, next) {
    try {
      req.user = await User.findOne({ email: req.body.email });
      const verify = req.user
        ? req.user.verifyPassword(req.body.password)
        : false;

      verify
        ? next()
        : res.status(400).json({ error: true, msg: "Invalid credentials" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SessionsController;
