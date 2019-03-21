module.exports = function(router, db) {
  router.post("/api/savemeeting", (req, res) => {
    db.sql.Meeting.create({
      date: req.body.date,
      time: req.body.time,
      title: req.body.title,
      agenda: "This is the agenda",
      minutes: "These are the minutes"
    });
  });

  return router;
};
