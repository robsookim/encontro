const controller = require("../controllers/controller");
const router = require("express").Router();

module.exports = function(router, db) {

  router.route("/api/meetings")
    .post(controller.saveMeeting);

  return router;
};
