const axios = require("axios");
const db = require("../models/sequelize");

module.exports = {

    saveMeeting: function(req, res) {
        const meeting = req.body;
        console.log("CONTROLLER meeting info: " + meeting);

        db.Meeting.create(meeting)
        .then(dbMeeting => 
            console.log("CONTROLLER saved a meeting: " + dbMeeting));
            res.json(dbMeeting)
        .catch(err => console.log(err))
    }
}