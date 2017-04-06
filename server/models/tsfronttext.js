'use strict';
module.exports = function(sequelize, DataTypes) {
  var TsFrontText = sequelize.define('TsFrontText', {
    tshirt_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    x_position: DataTypes.INTEGER,
    y_position: DataTypes.INTEGER,
    z_position: DataTypes.INTEGER,
    font: DataTypes.STRING,
    font_size: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          TsFrontText.belongsTo(models.Tshirt, {
              foreignKey: 'id'
          })
      }
    }
  });
  return TsFrontText;
};