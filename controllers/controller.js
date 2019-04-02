const axios = require("axios");
const agendaFunctions = require("./utilities/agenda.js");
const util = require("util");
const moment = require("moment");
const keys = {
  oneDeeper: "DPR332",
  same: "SME332",
  backOne: "BON332"
};
const regexx = new RegExp(
  `(.)*?((${keys.oneDeeper})|(${keys.same})|(${keys.backOne}))`,
  "gi"
);
module.exports = db => {
  return {
    getMeetings: async function(req, res) {
      const userId = req.session.passport.user.id;
      const organizationId = await db.sql.User.findOne({
        where: { id: userId },
        attributes: ["organization"]
      });
      let meetings = await db.mongo.Meeting.find({
        OrganizationId: organizationId.organization
      });

      // meetings = meetings.map(meeting => {
      //   const regexx = new RegExp(
      //     `(.)*?((${keys.oneDeeper})|(${keys.same})|(${keys.backOne}))`,
      //     "gi"
      //   );
      //   console.log("meeting agenda: " + meeting.agenda);
      //   meeting.agenda = agendaFunctions.agendaIntoObject(
      //     regexx,
      //     meeting.agenda
      //   ).agendaLevel;
      //   return meeting;
      // });
      // console.log("meeting agenda: " + meetings[0].agenda);
      console.log(meetings);
      res.send(meetings);
      // let meetings = await db.sql.Meeting.findAll();
      // res.json(meetings);
    },
    joinOrganization: async function(req, res) {
      const org = await db.sql.Organization.findOne({
        where: {
          id: Number(req.body.orgInp)
        }
      });

      if (org) {
        if (org.secret === req.body.orgSecret) {
          const response = await db.sql.User.update(
            { organization: Number(org.id) },
            {
              where: {
                id: req.session.passport.user.id
              }
            }
          );
          await db.sql.Organization.update(
            { members: org.members.concat(`,${req.session.passport.user.id}`) },
            {
              where: {
                id: Number(org.id)
              }
            }
          );
          res.send(org.name);
        } else {
          res.status(403);
        }
      } else {
        res.sendStatus(404);
      }
    },
    createOrganization: async function(req, res) {
      const newOrg = await db.sql.Organization.create({
        members: req.session.passport.user.id,
        name: req.body.orgName,
        secret: req.body.orgSecret,
        approvalRequired: req.body.orgApproval,
        UserId: req.session.passport.user.id
      });
      await db.sql.User.update(
        { organization: newOrg.id },
        { where: { id: req.session.passport.user.id } }
      );
      res.send(newOrg.name);
    },
    getMeetingByID: async function(req, res) {
      console.log("HERE");
      const meetingId = req.body.id;
      const meeting = await db.sql.Meeting.findOne({
        where: { id: meetingId }
      });

      console.log("meeting agenda: " + meeting.agenda);
      meeting.agenda = agendaFunctions.agendaIntoObject(
        regexx,
        meeting.agenda
      ).agendaLevel;
      for (let attendee of meeting.attendees.split(",")) {
        if (req.session.passport.user.id === attendee) {
          console.log(meeting);
          res.send(meeting);
        }
      }
      res.status(403);
    },
    getUsers: function(req, res) {
      db.sql.User.findAll()
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.status(422).json(err));
    },
    saveMeeting: async function(req, res) {
      const meeting = req.body;

      const user = await db.sql.User.findOne({
        where: { id: req.session.passport.user.id }
      });

      meeting.OrganizationId = user.organization;
      meeting.agenda =
        agendaFunctions.recieveAgenda(meeting.agenda) + keys.backOne;
      meeting.UserId = req.session.passport.user.id;
      meeting.attendees = req.session.passport.user.id;
      meeting.active = 0;
      db.sql.Meeting.create(meeting)
        .then(dbMeeting => res.json(dbMeeting))
        .catch(err => res.status(422).json(err));
    },
    getHostedMeetings: async function(req, res) {
      const meetings = await db.sql.Meeting.findAll({
        where: { UserId: req.session.passport.user.id }
      });
      res.send(
        meetings.filter(meeting => {
          return meeting.active ? false : true;
        })
      );
    },
    openMeetingLive: async function(req, res) {
      // transfers meeting data from sql into mongo to effectively begin a meeting. Done by meeting host
      // takes in a meeting id and returns the mongo meeting object, after making sure that the host is the session's user
      const meetingId = req.body.id;
      const meeting = await db.sql.Meeting.findOne({
        where: { id: meetingId }
      });
      db.sql.Meeting.update({ active: 1 }, { where: { id: meetingId } }); // doesnt need to be waited on
      if (meeting.UserId !== req.session.passport.user.id) {
        res.status(403);
      }
      meeting.attendees = meeting.attendees.split(",").map(x => {
        return { attendee: x.trim(), present: false };
      });
      meeting.agenda = agendaFunctions.agendaIntoObject(
        regexx,
        meeting.agenda
      ).agendaLevel;
      console.log(meeting.dataValues);
      meeting.date = new Date(
        ...moment("040819", "MMDDYY")
          .format("YYYY MM DD")
          .split(" ")
          .map((x, i) => {
            return i === 1 ? Number(x) - 1 : Number(x);
          })
      );
      const liveMeeting = new db.mongo.Meeting(meeting.dataValues);

      liveMeeting.save(err => {
        if (err) console.log(err);
        res.send({ id: liveMeeting._id });
      });
    },
    closeLiveMeeting: async function(req, res) {
      // grabs meeting data from mongo and deletes the document. meeting data is then stored properly in sql for later access
      // takes in a mongo meeting id and returns nothing to front end
      const mongoMeetingId = req.body.meetingId;
      const mongoMeeting = await db.mongo.Meeting.findByIdAndRemove(
        mongoMeetingId
      );
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
      console.log("ID: " + req.body.id);
      const mongoMeetingId = req.body.id;
      const mongoMeeting = await db.mongo.Meeting.findById(
        db.mongo.mongoose.Types.ObjectId(mongoMeetingId)
      );
      console.log(mongoMeeting);

      if (mongoMeeting) {
        for (let attendee of mongoMeeting.attendees) {
          if (req.session.passport.user.id === attendee.attendee) {
            console.log("user is allowed");
            req.session.currentMeeting = mongoMeetingId;
            res.send(mongoMeeting);
          }
        }
        res.status(403);
      } else {
        res.status(404);
      }
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
          id: req.session.passport.user.id
        }
      });
      const orgUsers = await db.sql.Organization.findAll({
        where: {
          id: user.organizationId
        }
      });
      res.send(
        orgUsers
          .filter(user => {
            return user.match(new RegExp(`${req.body.searchName}`)); // searchName is the value in the search input field
          })
          .map(user => {
            return { id: user.id, name: user.name };
          })
      );
    },

    saveChat: async function(req, res) {
      const userID = req.session.passport.user.name;
      // const meetingID = req.body.id;

      // const mongoMeeting = await db.mongo.Meeting.findById(db.mongo.mongoose.Types.ObjectId(req.session.meetingId));

      console.log("~~~~~~~~~~~~~~~~~");
      console.log(req.session);
      console.log("~~~~~~~~~~~~~~~~~");
      const chatEntry = userID + ": " + req.body.text;
      res.json(chatEntry);
    }
  };
};
