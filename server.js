const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();
// Requiring our models for syncing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/encontro";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

const db = {
  sql: require("./models/sequelize"),
  mongo: require("./models/mongoose")
};

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const routes = require("./routes")(router, db);

app.use(routes);

db.sql.sequelize
  .sync({ force: process.env.NODE_ENV === "development" ? true : false })
  .then(() => {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
