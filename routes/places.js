const express = require("express");

const router = express.Router();

const Places = require("../controllers/PlacesController");

router
  .route("/")
  .get(Places.index)
  .post(Places.create);

router
  .route("/:id")
  .get(Places.show)
  .put(Places.update)
  .delete(Places.destroy);

module.exports = router;
