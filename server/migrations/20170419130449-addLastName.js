'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Users', 'last_name', Sequelize.STRING);

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'last_name');
    }
};
