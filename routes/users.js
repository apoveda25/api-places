const express = require("express");

const router = express.Router();

const Users = require("../controllers/UsersController");
const Sessions = require("../controllers/SessionsController");

router
  .route("/")
  .get(Users.myPlaces)
  .post(Users.create, Sessions.generateToken, Sessions.sendToken);

router
  .route("/:id")
  .get(Users.find, Users.show)
  .put(Users.find, Users.update)
  .delete(Users.find, Users.destroy);

module.exports = router;
