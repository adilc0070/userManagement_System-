const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose= require('mongoose')
const session = require("express-session");
const homeRouter = require("./routes/home");
const MainRouter = require("./routes/router");

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({secret:'Key',cookie:{maxAge:600000}}))


app.use(function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, privante, no-store,must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.use("/", MainRouter);
app.use("/home", homeRouter);



app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};


  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
