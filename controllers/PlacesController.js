const Places = require("../models/Places");
const Uploader = require("../models/Uploader");
const Controller = require("./Controller");

const attrBody = [
  "title",
  "description",
  "acceptsCreditCard",
  "openHour",
  "closeHour",
  "address",
  "slug",
];

const attrFiles = ["avatar", "cover"];

class PlacesController extends Controller {
  static async find(req, res, next) {
    try {
      req.place = await Places.findOne({ slug: req.params.id });

      if (req.place == null)
        res.status(404).send({ error: true, msg: "Not Found" });

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
      const paramsBody = super.paramsBuilderBody(attrBody, req.body);
      const paramsFile = req.files
        ? super.paramsBuilderFile(attrFiles, req.files)
        : {};

      const doc = await Places.create({
        ...paramsBody,
        ...paramsFile,
        _user: req.user.id,
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
      const paramsBody = super.paramsBuilderBody(attrBody, req.body);
      const paramsFile = req.files
        ? super.paramsBuilderFile(attrFiles, req.files)
        : {};

      req.place = Object.assign(req.place, { ...paramsBody, ...paramsFile });

      const doc = await req.place.save();

      res.status(200).json(doc);
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

  static async imagesUpload(req, res, next) {
    try {
      if (req.files) {
        attrFiles.forEach((file) => {
          if (req.files.hasOwnProperty(file)) {
            req.files[file].path = `./uploads/${req.files[file].name}`;

            req.files[file].mv(req.files[file].path, (err) => {
              if (err) next(err);
            });
          }
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  static async cloudinaryUpload(req, res, next) {
    try {
      if (req.files) {
        attrFiles.forEach((file) => {
          if (req.files.hasOwnProperty(file)) {
            Uploader(req.files[file].path)
              .then((data) => {
                req.files[file].url = data;

                next();
              })
              .catch((error) => {
                next(error);
              });
          }
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  static async setSlug(req, res, next) {
    try {
      req.body.slug = super.setSlug(req.body.title);
      const count = await Places.validateSlugCount(req.body.slug);

      if (!count) PlacesController.setSlug(req.body.slug);

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async validateSlugCount(slug) {
    try {
      const count = await Places.countDocuments({ slug });

      return count > 0 ? false : true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = PlacesController;
