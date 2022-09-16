'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const votes = [];
    for (let i = 1; i < 9; i++) {
      for (let j = 0; j < 10; j++) {
        const vote = {
          article_id: 1,
          comment_id: i,
          ip_address: `1.0.1.${i * j}`,
          upvote: true
        }
        votes.push(vote);
      }
      for (let k = 0; k < 5 ; k++) {
        const vote = {
          article_id: 1,
          comment_id: i,
          ip_address: `2.0.1.${i * k}`,
          downvote: true
        }
        votes.push(vote);
      }
    }

    await queryInterface.bulkInsert('votes', votes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('votes', null, {});
  }
};
