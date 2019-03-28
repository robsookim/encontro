const router = require("express").Router();

module.exports = function(router, db) {
  const controller = require("../controllers/controller")(db);
  router.route("/api/meetings")
    // this `get` route needs a callback function somewhere along the line? not sure where but the server won't start without it
    .get(controller.getMeetings)

    .post(controller.saveMeeting);

  router.route("/api/users")
    .get(controller.getUsers)

  router.route("/meeting/:id")
    .get(controller.getMeetingByID)

  return router;
};
