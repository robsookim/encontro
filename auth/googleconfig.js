const GoogleStrategy = require("passport-google-oauth20").Strategy;
function extractProfile(profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    name: profile.displayName,
    image: imageUrl,
  };
}

module.exports = function(db, nodeEnv) {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: !nodeEnv?"http://localhost:3001/auth/google/callback":"https://encontro.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, extractProfile(profile));
    }
  );
};
