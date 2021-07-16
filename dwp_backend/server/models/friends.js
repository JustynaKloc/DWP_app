module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define('Friends', {
    fid: {type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true},
    follower_uid:DataTypes.STRING,
    following_uid:DataTypes.STRING
  }, {
    tableName: 'a_friends',
    freezeTableName: true,
    updatedAt: false
  });
  Friends.associate = function(models) {
    Friends.belongsTo(models.User, {
      foreignKey: "following_uid",
      as:'following'
    });

    Friends.belongsTo(models.User, {
      foreignKey: 'follower_uid',
      as:'follower'
    })
  };
  return Friends;
};
