const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");


require("dotenv").config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();
// Requiring our models for syncing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function authRequired(req, res, next) {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect("/auth/login");
  }
  next();
}
app.use(authRequired);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/encontro";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

const db = {
  sql: require("./models/sequelize"),
  mongo: require("./models/mongoose")
};

passport.use(require("./auth/googleconfig.js")(db));
passport.use(require("./auth/linkedinconfig.js")(db));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes")(router, db, passport);

app.use(routes);

db.sql.sequelize
  .sync({ force: process.env.NODE_ENV === "development" ? true : false })
  .then(() => {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
