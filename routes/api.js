const router = require("express").Router();

module.exports = function(router, db) {
  const controller = require("../controllers/controller")(db);
  router
    .route("/api/meetings")
    .get(controller.getMeetings)
    .post(controller.saveMeeting);
  router.route("/api/meetings/ashost").get(controller.getHostedMeetings);
  router.route("/meeting/:id").post(controller.getMeetingByID);
  router.route("/meeting/:id/chat").post(controller.saveChat);
  router.route("/meeting/start").put(controller.openMeetingLive);
  router
    .route("/api/users")
    // .get(controller.getUsers)
    .post(controller.getUsersInOrgBySearch);

  router
    .route("/api/organization")
    .put(controller.joinOrganization)
    .post(controller.createOrganization);

  return router;
};
