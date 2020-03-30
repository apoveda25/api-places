const Places = require("../models/Places");
const Uploader = require("../models/Uploader");

class PlacesController {
  static async find(req, res, next) {
    try {
      req.place = await Places.findById(req.params.id);

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
      const doc = await Places.create({
        title: req.body.title,
        description: req.body.description,
        acceptsCreditCard: req.body.acceptsCreditCard,
        openHours: req.body.openHours,
        closeHour: req.body.closeHour,
        avatarImage: req.files.avatar.url
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

      if (req.files) {
        req.fileNames.forEach(file => {
          if (req.files.hasOwnProperty(file)) {
            params[`${file}Image`] = req.files[file].url;
          }
        });
      }

      req.place = Object.assign(req.place, params);

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
      req.fileNames = ["avatar", "cover"];

      if (req.files) {
        req.fileNames.forEach(file => {
          if (req.files.hasOwnProperty(file)) {
            req.files[file].path = `./uploads/${req.files[file].name}`;

            req.files[file].mv(req.files[file].path, err => {
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
        req.fileNames.forEach(file => {
          if (req.files.hasOwnProperty(file)) {
            Uploader(req.files[file].path)
              .then(data => {
                req.files[file].url = data;

                next();
              })
              .catch(error => {
                next(error);
              });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PlacesController;
