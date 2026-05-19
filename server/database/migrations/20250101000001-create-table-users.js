'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      tgId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      langCode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      invitedBy: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      photoUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      points: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
