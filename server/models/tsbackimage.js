'use strict';
module.exports = function(sequelize, DataTypes) {
  var TsBackImage = sequelize.define('TsBackImage', {
    tshirt_id: DataTypes.STRING,
    url: DataTypes.STRING,
    x_position: DataTypes.INTEGER,
    y_position: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          TsBackImage.belongsTo(models.Tshirt, {
              foreignKey: 'id'
          })
      }
    }
  });
  return TsBackImage;
};