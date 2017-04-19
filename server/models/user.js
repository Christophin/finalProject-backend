'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          User.hasMany(models.Tshirt, {
              foreignKey: 'user_id'
          });
          User.addScope('tshirts', {
              include: {
                  model: models.Tshirt
              }
          });
      }
    }
  });
  return User;
};