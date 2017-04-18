'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tshirt = sequelize.define('Tshirt', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    ts_front_url: DataTypes.STRING,
    ts_back_url: DataTypes.STRING,
    preview_url: DataTypes.STRING
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
        Tshirt.hasMany(models.TsFrontText, {
            foreignKey: 'tshirt_id',
            as: 'tsFrontText'
        });
        Tshirt.hasMany(models.TsBackText, {
            foreignKey: 'tshirt_id',
            as: 'tsBackText'
        });
      }
    }
  });
  return Tshirt;
};