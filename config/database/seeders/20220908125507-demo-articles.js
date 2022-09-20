'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const articles = [];
    for (let i = 0; i < 5; i++) {
      articles.push({
        title: `Lorem ipsum${i + 1}`,
        perex: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Duis condimentum augue id magna semper rutrum. Nulla non arcu lacinia neque faucibus fringilla. Etiam bibendum elit eget erat. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Donec quis nibh at felis congue commodo. Vivamus ac leo pretium faucibus. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Maecenas aliquet accumsan leo. In enim a arcu imperdiet malesuada.

Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Integer in sapien. Nulla pulvinar eleifend sem. Pellentesque ipsum. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Nunc auctor. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. In rutrum. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Nulla pulvinar eleifend sem. Sed ac dolor sit amet purus malesuada congue. Duis risus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Integer malesuada.${i + 1}`,
        deleted: false,
        state: `done`,
        image: `../../../assets/article-images/image${i + 1}.jpeg`,
        user_id: i + 1
      });
    }
    const draft = {
      title: `Lorem ipsum`,
      perex: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Duis condimentum augue id magna semper rutrum. Nulla non arcu lacinia neque faucibus fringilla. Etiam bibendum elit eget erat. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Donec quis nibh at felis congue commodo. Vivamus ac leo pretium faucibus. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Maecenas aliquet accumsan leo. In enim a arcu imperdiet malesuada.

Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Integer in sapien. Nulla pulvinar eleifend sem. Pellentesque ipsum. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Nunc auctor. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. In rutrum. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Nulla pulvinar eleifend sem. Sed ac dolor sit amet purus malesuada congue. Duis risus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Integer malesuada.`,
      deleted: false,
      state: `draft`,
      image: `../../../assets/article-images/image1.jpeg`,
      user_id: 5
    }
    articles.push(draft);
    await queryInterface.bulkInsert('articles', articles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
