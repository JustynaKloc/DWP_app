module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    aid: {type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true},
    a_type: DataTypes.STRING,
    a_duration: DataTypes.INTEGER,
  }, {
    tableName: 'a_activity',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });
  Activity.associate = function(models) {
    // associations can be defined here
  };
  return Activity;
};
