'use strict';
const Sequelize = require('sequelize');
const {DataTypes, DATE} = require('sequelize');

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('votes', {
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      },
      dislike: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      }
    });
    await queryInterface.addConstraint('votes', {
      fields: ['article_id', 'comment_id', 'ip_address'],
      type: 'unique',
      name: 'unique_vote'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('votes');
  }
};
