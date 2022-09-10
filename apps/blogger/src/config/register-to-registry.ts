import logger from '@blogger/util-logger';
import 'dotenv/config';
import ApiRegistration from "@blogger/util-registry-registrator";

const registerToRegistry = () => {
  const devDocsPath = 'apps/blogger/src/config/swagger-docs.js';
  const bloggerServiceUrl = `${process.env["BLOGGER_SERVICE_URL"]}:${process.env['PORT_BLOGGER']}/`;
  const description = 'Blog Management Service';
  const name = 'blogger-service-api';

  ApiRegistration.registerApiToRegistry(bloggerServiceUrl, devDocsPath, description, name)
  .then(() => {
    logger.info('Successfully registered to registry');
  })
  .catch(err => {
    if (err.code === 'ECONNREFUSED') {
      logger.error('Api registry unavailable');
    } else {
      logger.error(`Registration failed: ${err}`);
    }
  });
};

export default registerToRegistry;
