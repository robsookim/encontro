const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require("../models");

module.exports = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.encontro.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    db.sql.User.findOrCreate({ googleId: profile.id }, function(err, user) {
      return done(err, user);
    });
  }
);