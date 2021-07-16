module.exports = (sequelize, DataTypes) => {
  const User_Activity = sequelize.define('User_Activity', {
    aid: {type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true},
    uid:DataTypes.STRING,
    type:DataTypes.STRING,
    duration:DataTypes.FLOAT,
    points:DataTypes.FLOAT,
    updatedAt:DataTypes.DATE
  }, {
    tableName: 'a_user_activity',
    freezeTableName: true,
    createdAt: false
  });
  User_Activity.associate = function(models) {
    // associations can be defined here

    User_Activity.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'uid'
    });
  };
  return User_Activity;
};
