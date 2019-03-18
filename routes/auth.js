module.exports = function(router, passport) {
  router.get(
    "/auth/google",
    (req, res, next) => {
      if (req.query.return) {
        req.session.oauth2return = req.query.return;
      }
      next();
    },
    passport.authenticate("google", {
      scope: ["email", "profile"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      const redirect = req.session.oauth2return || "/home";
      delete req.session.oauth2return;
      res.redirect(redirect);
    }
  );

  app.get("/auth/linkedin", passport.authenticate("linkedin"), (req, res) => {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

  app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );

  return router;
};
