module.exports = function(sequelize, DataTypes) {
    var Organization = sequelize.define("Organization", {
      name: DataTypes.STRING,
      picture: {
        type: DataTypes.STRING
      },
      secret:{
        type: DataTypes.STRING,
        default: null
      },
      members: {
        type: DataTypes.STRING,
        default: null
      },
      numMeetings: {
        type: DataTypes.INTEGER,
        default: 0
      },
      approvalRequired:{
        type: DataTypes.INTEGER,
        default:1
      }
    });
  
    Organization.associate = function(models) {
      Organization.hasMany(models.Meeting);
      Organization.belongsTo(models.User);
    };
  
    return Organization;
  };
  