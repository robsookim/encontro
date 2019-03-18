module.exports = function(router, db) {
  router.post("/api/savemeeting", (req, res) => {
    db.sql.Meeting.create({
      date: Date,
      time: Date.time,
      title: "Meeting",
      agenda: "This is the agenda",
      minutes: "These are the minutes"
    });
  });

  return router;
};
