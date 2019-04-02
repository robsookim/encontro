const router = require("express").Router();

module.exports = function(router, db) {
  const controller = require("../controllers/controller")(db);
  router
    .route("/api/meetings")
    .get(controller.getMeetings)
    .post(controller.saveMeeting);
  router.route("/api/all/meetings").get(controller.getAllMeetings);
  router.route("/api/all/members").get(controller.getAllMembers);

  router.route("/api/meetings/ashost").get(controller.getHostedMeetings);
  router.route("/meeting/:id").post(controller.joinMeeting);
  router.route("/meeting/:id/chat/get").post(controller.getChat);
  router.route("/meeting/:id/chat").post(controller.saveChat);
  router.route("/meeting/start").put(controller.openMeetingLive);
  router.route("/meeting/live/editagenda").put(controller.editAgendaLive);
  router.route("/api/userinfo").get((req, res) => {
    res.send({
      name: req.session.passport.user.name,
      picture: req.session.passport.user.image
    });
  });
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
