'use strict';
module.exports = function(sequelize, DataTypes) {
  var ShopifyUser = sequelize.define('ShopifyUser', {
    user_id: DataTypes.INTEGER,
    shop_name: DataTypes.STRING,
    token: DataTypes.STRING,
    nonce: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ShopifyUser;
};