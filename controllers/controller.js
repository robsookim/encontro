const axios = require("axios");
const agendaFunctions = require("./utilities/agenda.js");

module.exports = db => {
  return {
    getMeetings: async function(req, res) {
      const userId = req.passport.session.id;
      const organizationId = await db.sql.User.findOne({
        where: { id: userId },
        attributes: ["organization"]
      });
      let meetings = await db.sql.Meeting.findAll({
        where: { OrganizationId: organizationId[0] }
      });
      meetings = meetings.map(meeting => {
        meeting.agenda = agendaFunctions.agendaIntoObject(meeting.agenda);
        return meeting;
      });
      res.send(meetings);
    },
    getMeetingByID: async function(req, res) {
      const meetingId = req.params.id;
      const meeting = await db.sql.Meeting.findOne({
        where: { id: meetingId }
      });
      res.json(meeting);
    },
    getUsers: function(req, res) {
      db.sql.User.findAll()
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.status(422).json(err));
    },
    saveMeeting: function(req, res) {
      const meeting = req.body;
      console.log("CONTROLLER meeting info: " + meeting);
      meeting.agenda = agendaFunctions.recieveAgenda(meeting.agenda);
      db.sql.Meeting.create(meeting)
        .then(dbMeeting => res.json(dbMeeting))
        .catch(err => res.status(422).json(err));
    },
    openMeetingLive: async function(req, res) {
      const meeting = req.params.id;
      const meeting = await db.sql.Meeting.findOne({
        where: { id: meetingId }
      });
      meeting.attendees = meeting.attendees.split(",").map(x => {
        return { attendee: x.trim(), present: false };
      });
      meeting.agenda = agendaFunctions.agendaIntoObject(meeting.agenda);

      const liveMeeting = new db.mongo.Meeting(meeting);
      liveMeeting.save(err => {
        if (err) console.log(err);
      });
      res.send(meeting);
    },
    closeLiveMeeting: async function(req, res) {
      const mongoMeetingId = req.params.id;
      const mongoMeeting = await db.mongo.findByIdAndRemove(mongoMeetingId);
      mongoMeeting.agenda = agendaFunctions.recieveAgenda(mongoMeeting.agenda);
      mongoMeeting.attendees = mongoMeeting.attendees
        .map(x => x.attendee)
        .join(",");
      delete mongoMeeting._id;
      const sqlMeetingId = mongoMeeting.id;
      await db.sql.Meeting.update(
        { mongoMeeting },
        { where: { id: sqlMeetingId } }
      );
      res.send("Meeting closed and saved");
    },
    joinMeeting: async function(req, res) {
      const mongoMeetingId = req.params.id;
      const mongoMeeting = await db.mongo.findById(mongoMeetingId);
      if (mongoMeeting) {
        if (!(req.passport.session.UserId in mongoMeeting.attendees)) {
          res.status(404);
        }
      } else {
        res.status(404);
      }
      req.session.currentMeeting = mongoMeetingId;
      res.send(mongoMeeting);
    }
  };
};
