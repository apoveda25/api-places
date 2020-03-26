const express = require("express");

const router = express.Router();

const Places = require("../controllers/PlacesController");

router
  .route("/")
  .get(Places.index)
  .post(Places.create);

router
  .route("/:id")
  .get(Places.find, Places.show)
  .put(Places.find, Places.update)
  .delete(Places.find, Places.destroy);

module.exports = router;
