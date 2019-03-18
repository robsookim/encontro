const LinkedInStrategy = require("passport-linkedin-oauth2").OAuth2Strategy;

module.exports = function(db) {
  return new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: "https://www.encontro.herokuapp.com/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_basicprofile"],
      state:true
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      db.sql.User.findOrCreate({ id: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  );
};
