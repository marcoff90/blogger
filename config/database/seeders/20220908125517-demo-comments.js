'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [];
    const content = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In convallis. Maecenas lorem.';
    for (let i = 0; i < 25; i++) {

      const level1 = {
        author: 'user1',
        content: content,
        article_id: i + 1,
        depth: 1
      }
      comments.push(level1);
    }
    for (let i = 0; i < 25; i++) {
      const level2 = {
        author: 'user2',
        content: content,
        article_id: i + 1,
        parent_id: i + 1,
        depth: 2
      }
      comments.push(level2);
    }
    for (let i = 0; i < 25; i++) {
      const level3 = {
        author: 'user3',
        content: content,
        article_id: i + 1,
        parent_id: 26 + i,
        depth: 3
      }
      comments.push(level3);
    }

    for (let i = 0; i < 25; i++) {
      const level4 = {
        author: 'user4',
        content: content,
        article_id: i + 1,
        parent_id: 51 + i,
        depth: 4
      }

      comments.push(level4);
    }

    await queryInterface.bulkInsert('comments', comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
