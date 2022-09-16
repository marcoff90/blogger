'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const articles = [];
    for (let i = 0; i < 5; i++) {
      articles.push({
        title: `article${i + 1}`,
        perex: `perex perex perex perex perex perex perex perex perex perex perex perex perex perex perex `,
        content: `content ${i + 1}`,
        deleted: false,
        state: `done`,
        image: `image ${i + 1}`,
        user_id: i + 1
      });
    }
    const draft = {
      title: `article6`,
      perex: `perex perex perex perex perex perex perex perex perex perex perex perex perex perex perex `,
      content: `content 6`,
      deleted: false,
      state: `draft`,
      image: `image 6`,
      user_id: 5
    }
    articles.push(draft);
    await queryInterface.bulkInsert('articles', articles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
