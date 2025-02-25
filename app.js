const express = require("express");
const path = require("path");
const passport = require("passport");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");


var env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];

console.log("Using configuration :", config);

require("./config/passport")(passport, config);

var app = express();

app.set("port", config.app.port);
app.set("views", __dirname + "/app/views");
app.set("view engine", "pug");
app.use(morgan("combined"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "This is not a secret, friend."
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

require("./config/routes")(app, config, passport);

app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
