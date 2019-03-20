module.exports = function(router,db, passport) {

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
  
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
    (req, res) => {
      console.log("HEY WHERE AM I");
      
      const redirect = "http://localhost:3000/home";
      delete req.session.oauth2return;
      res.redirect(redirect);
    }
  );

  router.get("/auth/linkedin", passport.authenticate("linkedin"), (req, res) => {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

  router.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
      successRedirect: "http://localhost:3000/home",
      failureRedirect: "http://localhost:3000/login"
    })
  );

  return router;
};
