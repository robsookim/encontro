const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();
// Requiring our models for syncing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/encontro";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

const db = {
  sql: require("./models/sequelize"),
  mongo: require("./models/mongoose")
};

passport.use(require("./auth/googleconfig.js")(db, process.env.NODE_ENV));
passport.use(require("./auth/linkedinconfig.js")(db, process.env.NODE_ENV));
passport.serializeUser((user, done) => {
  console.log("SERIALIZE");
  db.sql.User.findOrCreate({
    where: { id: user.id },
    defaults: { name: user.name, picture: user.image }
  }).then(() => {
    done(null, user);
  });
});
passport.deserializeUser((user, done) => {
  console.log(user);
  console.log("hitting the deserialize path");
  db.sql.User.findOrCreate({ where: { id: user.id } }).then(() => {
    done(null, user);
  });
});
passport.use(require("./auth/googleconfig.js")(db));
passport.use(require("./auth/linkedinconfig.js")(db));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true
    }
  })
);

// function authRequired(req, res, next) {
//   if (!req.session.passport) {
//     req.session.oauth2return = req.originalUrl;
//     if (
//       req.originalUrl === "/" &&
//       req.originalUrl === "/home"
//     ) {
//       return res.redirect("/login");
//     }
//   }
//   next();
// }
// app.use(authRequired);

const routes = require("./routes")(router, db, passport, process.env.NODE_ENV);

app.use(routes);
/////////////********************IF USING BUILD FOLDER, NOT FOR HOT RELOADING */
app.use(express.static(path.join(__dirname, 'client/build')));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client","build", "index.html"));
});
///////////////************************************************************** */

db.sql.sequelize
  .sync({ force: !process.env.NODE_ENV? true : false })
  .then(() => {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
