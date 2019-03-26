const LinkedInStrategy = require("passport-linkedin-oauth2").OAuth2Strategy;

function extractProfile(profile) {
  console.log(profile);
  return {
    id: profile.id,
    name:profile.name.givenName + " "+profile.name.familyName,
    image:profile._json.pictureUrl
  };
}

module.exports = function(db, nodeEnv) {
  console.log("nodeEnv: "+nodeEnv)
  return new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: nodeEnv?"https://encontro.herokuapp.com/auth/linkedin/callback":"http://localhost:3001/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_basicprofile"],
      state:true
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, extractProfile(profile));
    }
  );
};
