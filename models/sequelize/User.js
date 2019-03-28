module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    picture: {
      type: DataTypes.STRING
    },
    organization: {
      type: DataTypes.STRING,
      default: null
    },
    numMeetings: {
      type: DataTypes.INTEGER,
      default: 0
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Meeting);

    User.hasMany(models.Task);

    User.hasMany(models.Invitation);
  };

  return User;
};
