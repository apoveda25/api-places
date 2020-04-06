const Users = require("../models/Users");
const Controller = require("./Controller");

const attrBody = ["email", "name", "password"];

class UsersController extends Controller {
  static async find(req, res, next) {
    try {
      req.user = await Users.findOne({ slug: req.params.id });

      if (req.user == null)
        res.status(404).send({ error: true, msg: "Not Found" });

      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async index(req, res) {
    try {
      const docs = await Users.paginate(
        {},
        { page: req.query.page || 1, limit: 20, sort: { _id: -1 } }
      );

      res.json(docs);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  static async create(req, res, next) {
    try {
      const paramsBody = super.paramsBuilderBody(attrBody, req.body);

      req.user = await Users.create(paramsBody);

      next();
    } catch (error) {
      res.status(422).json({ error });
    }
  }

  static async show(req, res) {
    res.json(req.user);
  }

  static async update(req, res) {
    try {
      const paramsBody = super.paramsBuilderBody(attrBody, req.body);

      req.user = Object.assign(req.user, paramsBody);

      const doc = await req.user.save();

      res.status(200).json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  static async destroy(req, res) {
    try {
      const doc = await req.user.remove();

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  static async destroyAll(req, res) {
    try {
      const doc = await Users.remove({});

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async myPlaces(req, res) {
    try {
      const user = await Users.find({ _id: req.user.id });
      const places = await user.places;

      res.json(places);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, msg: "Error internal" });
    }
  }
}

module.exports = UsersController;
