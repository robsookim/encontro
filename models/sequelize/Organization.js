module.exports = function(sequelize, DataTypes) {
    var Organization = sequelize.define("Organization", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
      },
      name: DataTypes.STRING,
      picture: {
        type: DataTypes.STRING
      },
      members: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        default: null
      },
      numMeetings: {
        type: DataTypes.INTEGER,
        default: 0
      }
    });
  
    Organization.associate = function(models) {
      Organization.hasMany(models.Meeting);

      Organization.hasMany(models.User);
    };
  
    return User;
  };
  