module.exports = function(sequelize, DataTypes) {
    var Meeting = sequelize.define("Meeting", {
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        title: DataTypes.STRING,
        agenda: DataTypes.ARRAY(DataTypes.STRING),
        // attendees: DataTypes.ARRAY(DataTypes.STRING),
        minutes: DataTypes.TEXT
    });

    // Meeting.associate = function(models) {
    //     Meeting.hasMany(models.User, {
    //         // don't want to cascade on delete, but in case we want to do anything else...
    //     });
    // }

    return Meeting;
  };
  