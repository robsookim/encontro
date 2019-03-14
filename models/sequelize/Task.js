module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    // Giving the Author model a name of type STRING
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      autoIncrement:true
    },
    taskBody:{
        type:DataTypes.STRING,
        allowNull:false
    }
  });
  Task.associate = function(models) {

    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Task.belongsTo(models.Meeting, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
