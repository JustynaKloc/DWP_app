module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    gid: {type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true},
    g_name: DataTypes.STRING
  }, {
    tableName: 'a_group',
    freezeTableName: true,
    updatedAt: false
  });
  Group.associate = function(models) {
    // associations can be defined here
    Group.hasMany(models.User_Group, {
      foreignKey: 'gid',
      as: "User_Group"
    });
    
  };
  return Group;
};
