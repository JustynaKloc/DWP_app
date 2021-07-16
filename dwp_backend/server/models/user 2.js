module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid: {type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true},
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    email: DataTypes.STRING
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

    /*
    User.hasMany(models.User_Badges, {

    });

    User.hasMany(models.User_Activity, {

    });

    User.hasMany(models.Friends, {

    });
    */
  };

  return User;
};
