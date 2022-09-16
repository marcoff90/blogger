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
      upvote: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      },
      downvote: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
