'use strict';
module.exports = function(sequelize, DataTypes) {
  var TsFrontImage = sequelize.define('TsFrontImage', {
    tshirt_id: DataTypes.STRING,
    url: DataTypes.STRING,
    x_position: DataTypes.INTEGER,
    y_position: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        TsFrontImage.belongsTo(models.Tshirt, {
          foreignKey: 'id'
        })
      }
    }
  });
  return TsFrontImage;
};