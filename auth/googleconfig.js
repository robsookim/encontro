const GoogleStrategy = require("passport-google-oauth20").Strategy;
function extractProfile(profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl,
  };
}

module.exports = function(db) {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(extractProfile(profile));
      done(null, extractProfile(profile));
    }
  );
};
