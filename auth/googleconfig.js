const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function(db) {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://www.encontro.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      db.sql.User.findOrCreate({ id: profile.id }, (err, user)=> {
        return done(err, user);
      });
    }
  );
};
