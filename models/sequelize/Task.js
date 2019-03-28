module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
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
        allowNull: true
      }
    });

    Task.belongsTo(models.Meeting, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Task;
};
