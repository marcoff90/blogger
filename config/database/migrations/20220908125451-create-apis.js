'use strict';
const Sequelize = require('sequelize');
const {DataTypes, DATE} = require('sequelize');

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('apis', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      server_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
