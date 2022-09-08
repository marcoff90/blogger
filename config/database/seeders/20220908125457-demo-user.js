'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {l
    //generate 5 activated users
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        username: `user${i + 1}`,
        email: `user${i + 1}@example.com`,
        active: true,
        password: bcrypt.hashSync('Password123', 5),
        avatar: `user${i + 1}/avatar.jpg`,
      });
    }
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
