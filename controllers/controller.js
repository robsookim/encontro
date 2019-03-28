const axios = require("axios");
const agendaFunctions = require("./utilities/agenda.js");

module.exports = db => {
  return {
    getMeetings: async function(req, res) {
      // const userId = req.session.passport.id;
      // const organizationId = await db.sql.User.findOne({
      //   where: { id: userId },
      //   attributes: ["organization"]
      // });
      // let meetings = await db.sql.Meeting.findAll({
      //   where: { OrganizationId: organizationId[0] }
      // });
      // meetings = meetings.map(meeting => {
      //   meeting.agenda = agendaFunctions.agendaIntoObject(meeting.agenda);
      //   return meeting;
      // });
      // res.json(meetings);

      let meetings = await db.sql.Meeting.findAll();
      res.json(meetings);
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
      // transfers meeting data from sql into mongo to effectively begin a meeting. Done by meeting host
      // takes in a meeting id and returns the mongo meeting object, after making sure that the host is the session's user
      const meetingId = req.params.id;
      const meeting = await db.sql.Meeting.findOne({
        where: { id: meetingId }
      });
      if (meeting.id !== req.session.passport.id) {
        res.status(403);
      }
      meeting.attendees = meeting.attendees.split(",").map(x => {
        return { attendee: x.trim(), present: false };
      });
      meeting.agenda = agendaFunctions.agendaIntoObject(meeting.agenda);

      const liveMeeting = new db.mongo.Meeting(meeting);
      liveMeeting.save(err => {
        if (err) console.log(err);
        return liveMeeting;
      });
    },
    closeLiveMeeting: async function(req, res) {
      // grabs meeting data from mongo and deletes the document. This meeting data is then stored properly in sql for later access
      // takes in a mongo meeting id and returns nothing to front end
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
      res.status(200);
    },
    joinMeeting: async function(req, res) {
      // takes in mongo meeting id and adds meeting to the user's session if he/she has access
      const mongoMeetingId = req.params.id;
      const mongoMeeting = await db.mongo.findById(mongoMeetingId);
      if (mongoMeeting) {
        if (!(req.session.passport.id in mongoMeeting.attendees)) {
          res.status(403);
        }
      } else {
        res.status(404);
      }
      req.session.currentMeeting = mongoMeetingId;
      res.send(200);
    },
    getUsersInOrg: async function(req, res) {
      // finds users within organization and returns array of names and ids
      const user = await db.sql.User.findOne({
        where: {
          id: req.session.passport.id
        }
      });
      const orgUsers = await db.sql.findAll({
        where: {
          id: user.get("organizationId")
        }
      });
      res.send(
        orgUsers.map(user => {
          return { id: user.id, name: user.name };
        })
      );
    },
    getUsersInOrgBySearch: async function(req, res) {
      // finds users within organization matching input field and returns array of names and ids
      const user = await db.sql.User.findOne({
        where: {
          id: req.session.passport.id
        }
      });

      const orgUsers = await db.sql.findAll({
        where: {
          id: user.get("organizationId")
        }
      });
      res.send(
        orgUsers.filter(user=>{
          return user.match(new RegExp(`${req.body.searchName}`)) // searchName is the value in the search input field
        }).map(user => {
          return { id: user.id, name: user.name };
        })
      );
    }
  };
};
