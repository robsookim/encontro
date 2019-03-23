const axios = require("axios");
const db = require("../models");

module.exports = {

    getMeetings: async function(req, res) {
        const userId = req.passport.session.id;
        const organizationId = await db.sql.User.findOne({where:{id:userId}, attributes:['organization']});
        const meetings = await db.sql.Meeting.findAll({where:{OrganizationId:organizationId[0]}});
        res.send(meetings);
    },

    saveMeeting: function(req, res) {
        const meeting = req.body;
        console.log("CONTROLLER meeting info: " + meeting);

        db.sql.Meeting.create(meeting)
        .then(dbMeeting => res.json(dbMeeting))
        .catch(err => res.status(422).json(err));
    }
}