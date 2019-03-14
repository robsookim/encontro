module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
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
      default: 0
    },
    numQuotes: {
      type: DataTypes.INTEGER,
      default: 0
    }
  });
  User.associate = function(models) {
    User.hasMany(models.MeetingNote, {
      onDelete: "cascade"
    });
  };

  return User;
};
