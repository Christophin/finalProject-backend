'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Tshirts', 'preview_url', Sequelize.STRING);

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Tshirts', 'preview_url');
    }
};
