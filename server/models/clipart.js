'use strict';
module.exports = function(sequelize, DataTypes) {
  var Clipart = sequelize.define('Clipart', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Clipart;
};