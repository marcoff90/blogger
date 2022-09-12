'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    //generate 5 activated users
    const comments = [];

    const comment1 = {
      id: 1,
      author: 'user1',
      content: 'hello world',
      article_id: 1,
      depth: 1
    }
    const comment2 = {
      id: 2,
      author: 'user2',
      content: 'hello world',
      article_id: 1,
      depth: 2,
      parent_id: 1
    }
    const comment3 = {
      id: 3,
      author: 'user3',
      content: 'hello world',
      article_id: 1,
      depth: 3,
      parent_id: 2
    }
    const comment4 = {
      id: 4,
      author: 'user4',
      content: 'hello world',
      article_id: 1,
      depth: 4,
      parent_id: 3
    }
    const comment5 = {
      id: 5,
      author: 'user5',
      content: 'hello world',
      article_id: 1,
      depth: 2,
      parent_id: 1
    }
    const comment6 = {
      id: 6,
      author: 'user6',
      content: 'hello world',
      article_id: 1,
      depth: 1
    }
    const comment7 = {
      id: 7,
      author: 'user7',
      content: 'hello world',
      article_id: 1,
      depth: 2,
      parent_id: 6
    }
    const comment8 = {
      id: 8,
      author: 'user8',
      content: 'hello world',
      article_id: 1,
      depth: 3,
      parent_id: 7
    }
    comments.push(comment1);
    comments.push(comment2);
    comments.push(comment3);
    comments.push(comment4);
    comments.push(comment5);
    comments.push(comment6);
    comments.push(comment7);
    comments.push(comment8);

    await queryInterface.bulkInsert('comments', comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
