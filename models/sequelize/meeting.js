module.exports = function(sequelize, DataTypes) {
  var Meeting = sequelize.define("Meeting", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    agenda: {
      type: DataTypes.TEXT
    },
    attendees: {
      type: DataTypes.STRING
    },
    minutes: {
      type: DataTypes.TEXT
    }
  });

  Meeting.associate = function(models) {
    Meeting.hasMany(models.User);

    // not sure if this will be necessary
    Meeting.hasMany(models.Task);

    // Meeting.belongsTo(models.Organization);
  };

  return Meeting;
};
