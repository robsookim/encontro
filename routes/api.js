const controller = require("../controllers/controller");
const router = require("express").Router();

module.exports = function(router, db) {

  router.route("/api/meetings")
    // this `get` route needs a callback function somewhere along the line? not sure where but the server won't start without it
    // .get(controller.getMeetings)

    .post(controller.saveMeeting);

  return router;
};
