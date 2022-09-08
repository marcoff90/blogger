'use strict';
const Sequelize = require('sequelize');
const {DataTypes, DATE} = require('sequelize');

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      confirmationToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
      },
      confirmationTokenExpiration: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null,
        unique: true,
      },
      forgottenPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
      },
      forgottenPasswordTokenExpiration: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
