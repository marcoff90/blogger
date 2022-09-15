'use strict';
const Sequelize = require('sequelize');
const {DataTypes, DATE} = require('sequelize');

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      perex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      state: {
        type: DataTypes.ENUM('draft','done'),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
      },
      updated_at: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
      }
    });
    await queryInterface.addIndex('articles', ['user_id', 'id']);
    await queryInterface.addIndex('articles', ['user_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');
  }
};
