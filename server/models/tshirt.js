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
        Tshirt.hasMany(models.TsFrontImage, {
          foreignKey: 'tshirt_id',
          as: 'tsFrontImages'
        });
        Tshirt.hasMany(models.TsBackImage, {
          foreignKey: 'tshirt_id',
          as: 'tsBackImages'
        });
      }
    }
  });
  return Tshirt;
};