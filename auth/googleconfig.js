const GoogleStrategy = require("passport-google-oauth20").OAuth2Strategy;

module.exports = function(db) {
  return new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://www.encontro.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      db.sql.User.findOrCreate({ id: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  );
};