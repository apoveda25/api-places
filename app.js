var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const fileUpload = require("express-fileupload");
const jwtMiddleware = require("express-jwt");
const dotenv = require("dotenv");

const db = require("./config/database");

const users = require("./routes/users");
const sessions = require("./routes/sessions");
const places = require("./routes/places");

db.connect();
var app = express();
dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(
  jwtMiddleware({ secret: process.env.TOKEN_SECRET }).unless({
    path: ["/sessions"],
    //method: "GET",
  })
);

app.use("/users", users);
app.use("/sessions", sessions);
app.use("/places", places);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
