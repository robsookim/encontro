module.exports = function(sequelize, DataTypes) {
    var Meeting = sequelize.define("Meeting", {
        id : {
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
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        attendees: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        minutes: {
            type: DataTypes.TEXT
        }
    });

    Meeting.associate = function(models) {
        // Meeting.hasMany(models.User);

        Meeting.hasMany(models.Task);

        Meeting.belongsTo(models.Organization, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Meeting;
  };
  