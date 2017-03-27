'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tshirt = sequelize.define('Tshirt', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    ts_front_url: DataTypes.STRING,
    ts_back_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tshirt;
};