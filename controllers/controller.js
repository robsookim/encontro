const axios = require("axios");
const db = require("../models/sequelize");

module.exports = {

    getMeetings: function(req, res) {
        db.Meeting.findAll()
        .then(dbMeetings => res.json(dbMeetings))
        .catch(err => res.status(422).json(err));
    },

    getUsers: function(req, res) {
        db.User.findAll()
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.status(422).json(err));
    },

    saveMeeting: function(req, res) {
        const meeting = req.body;
        db.Meeting.create(meeting)
        .then(dbMeeting => res.json(dbMeeting))
        .catch(err => res.status(422).json(err));
    }
}