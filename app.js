var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const db = require("./config/database");
const Places = require("./models/places");

db.connect();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/places", async (req, res) => {
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
  }
});

app.get("/places", async (req, res) => {
  try {
    const docs = await Places.find({});

    res.json(docs);
  } catch (error) {
    console.error(error);
  }
});

app.get("/places/:id", async (req, res) => {
  try {
    const doc = await Places.findById(req.params.id);

    res.json(doc);
  } catch (error) {
    console.error(error);
  }
});

app.put("/places/:id", async (req, res) => {
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
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
