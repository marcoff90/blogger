'use strict';
const Sequelize = require('sequelize');
const {DataTypes, DATE} = require('sequelize');

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      depth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      created_at: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
