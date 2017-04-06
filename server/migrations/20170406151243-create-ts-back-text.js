'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('TsBackTexts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tshirt_id: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      x_position: {
        type: Sequelize.INTEGER
      },
      y_position: {
        type: Sequelize.INTEGER
      },
      z_position: {
        type: Sequelize.INTEGER
      },
      font: {
        type: Sequelize.STRING
      },
      font_size: {
        type: Sequelize.INTEGER
      },
      html_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('TsBackTexts');
  }
};