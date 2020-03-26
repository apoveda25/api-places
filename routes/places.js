const express = require("express");

const router = express.Router();

const Places = require("../models/places");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const docs = await Places.find({});

      res.json(docs);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  })
  .post(async (req, res) => {
    try {
      const doc = await Places.create({
        title: req.body.title,
        description: req.body.description,
        acceptsCreditCard: req.body.acceptsCreditCard,
        openHours: req.body.openHours,
        closeHour: req.body.closeHour
      });

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const doc = await Places.findById(req.params.id);

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  })
  .put(async (req, res) => {
    try {
      const attributes = [
        "title",
        "description",
        "acceptsCreditCard",
        "openHours",
        "closeHour"
      ];
      const place = {};

      attributes.map(attr => {
        if (req.body.hasOwnProperty(attr)) {
          place[attr] = req.body[attr];
        }
      });

      const doc = await Places.findOneAndUpdate({ _id: req.params.id }, place, {
        new: true
      });

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const doc = await Places.findByIdAndRemove(req.params.id);

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  });

module.exports = router;
