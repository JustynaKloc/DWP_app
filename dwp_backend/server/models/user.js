module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid: {type:DataTypes.STRING,
          primaryKey: true},
    username: DataTypes.STRING,
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    totalpoints: DataTypes.FLOAT

  }, {
    freezeTableName: true,
    tableName: "a_user",
    updatedAt: false
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.User_Group, {
      foreignKey:'uid',
      as: 'User_Group'
    });

    User.hasMany(models.User_Activity, {
      foreignKey:'uid',
      as:'User_Activity'
    });

    User.hasMany(models.Friends, {
      foreignKey: 'follower_uid',
      as: 'follower_uid'
    });
    User.hasMany(models.Friends, {
      foreignKey: 'following_uid',
      as: 'following_uid'
    });
  };

  return User;
};
