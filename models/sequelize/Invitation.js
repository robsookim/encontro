module.exports = function(sequelize, DataTypes) {
  var Invitation = sequelize.define("Invitation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    meetingId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from: {
      type: DataTypes.String,
      allowNull: false
    },
    organization: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Invitation.associate = function(models) {
    Invitation.belongsTo(models.User, {
      foreignKey: {}
    });
  };

  return Invitation;
};
