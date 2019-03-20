const LinkedInStrategy = require("passport-linkedin-oauth2").OAuth2Strategy;

function extractProfile(profile) {
  return {
    id: profile.id
  };
}

module.exports = function(db) {
  return new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_basicprofile"],
      state:true
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(extractProfile(profile));
      done(null, extractProfile(profile));
    }
  );
};
