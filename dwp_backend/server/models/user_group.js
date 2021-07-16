module.exports = (sequelize, DataTypes) => {
  const User_Group = sequelize.define('User_Group', {
    ugid: {type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true},
    uid:DataTypes.STRING,
    gid: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    tableName: 'a_user_group',
    freezeTableName: true,
    updatedAt: false
  });
  User_Group.associate = function(models) {
    // associations can be defined here
    User_Group.belongsTo(models.Group, {
      foreignKey: 'gid',
      as: 'Group'
    });

    User_Group.belongsTo(models.User, {
      foreignKey: 'uid',
      as: 'User'
    });
  };
  return User_Group;
};
