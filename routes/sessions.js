const express = require("express");

const router = express.Router();

const Sessions = require("../controllers/SessionsController");

router
  .route("/")
  .post(Sessions.authenticate, Sessions.generateToken, Sessions.sendToken);

module.exports = router;
