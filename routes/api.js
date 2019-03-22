const controller = require("../controllers/controller");
const router = require("express").Router();

module.exports = function(router, db) {

  router.route("/api/meetings")
    .get(controller.getMeetings)
    .post(controller.saveMeeting);

  return router;
};
