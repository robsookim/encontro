const router = require("express").Router();

module.exports = function(router, db) {
  const controller = require("../controllers/controller")(db);
  router.route("/api/meetings")
    .get(controller.getMeetings)

    .post(controller.saveMeeting);

  router.route("/api/users")
    .get(controller.getUsers)

  return router;
};
