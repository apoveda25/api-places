const Places = require("../models/Places");

class PlacesController {
  static async find(req, res, next) {
    try {
      req.place = await Places.findById(req.params.id);

      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

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
    res.json(req.place);
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
      const params = {};

      attributes.map(attr => {
        if (req.body.hasOwnProperty(attr)) {
          params[attr] = req.body[attr];
        }
      });

      req.place = Object.assign(req.place, params);

      const doc = await req.place.save();

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  static async destroy(req, res) {
    try {
      const doc = await req.place.remove();

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
}

module.exports = PlacesController;
