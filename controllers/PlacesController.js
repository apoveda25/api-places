const Places = require("../models/Places");

class PlacesController {
  static async index(req, res) {
    try {
      const docs = await Places.paginate(
        {},
        { page: req.query.page || 1, limit: 20, sort: { _id: -1 } }
      );

      res.json(docs);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  static async create(req, res) {
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
  }

  static async show(req, res) {
    try {
      const doc = await Places.findById(req.params.id);

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  static async update(req, res) {
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
  }

  static async destroy(req, res) {
    try {
      const doc = await Places.findByIdAndRemove(req.params.id);

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
}

module.exports = PlacesController;
