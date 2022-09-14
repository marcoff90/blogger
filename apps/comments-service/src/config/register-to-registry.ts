import logger from '@blogger/util-logger';
import 'dotenv/config';
import ApiRegistration from "@blogger/util-registry-registrator";

const registerToRegistry = (): void => {
  const devDocsPath = 'apps/comments-service/src/config/swagger-docs.js';
  const commentServiceUrl = `${process.env["COMMENTS_SERVICE_URL"]}:${process.env['PORT_COMMENTS']}/`;
  const description = 'Comments Management Service';
  const name = 'comments-service-api';

  ApiRegistration.registerApiToRegistry(commentServiceUrl, devDocsPath, description, name)
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
