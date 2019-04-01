const router = require("express").Router();

module.exports = function(router, db) {
  const controller = require("../controllers/controller")(db);
  router.route("/api/meetings")
    .get(controller.getMeetings)
    .post(controller.saveMeeting);
  router.route("/meeting/id")
    .post(controller.getMeetingByID);
  router.route("/api/users")
    // .get(controller.getUsers)
    .post(controller.getUsersInOrgBySearch)
    
  router.route("/api/organization")
    .put(controller.joinOrganization)
    .post(controller.createOrganization)

  return router;
};
