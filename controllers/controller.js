const axios = require("axios");
const db = require("../models/sequelize");

module.exports = {

    // getMeetings: function(req, res) {

    // },

    saveMeeting: function(req, res) {
        const meeting = req.body;
        console.log("CONTROLLER meeting info: " + meeting);

        db.Meeting.create(meeting)
        .then(dbMeeting => res.json(dbMeeting))
        .catch(err => res.status(422).json(err));
    }
}