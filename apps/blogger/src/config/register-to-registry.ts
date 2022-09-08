import logger from '@blogger/util-logger';
import 'dotenv/config';
import ApiRegistration from "@blogger/util-registry-registrator";

const registerToRegistry = () => {
  const dockerDocksPath = 'swagger-docs.js';
  const devDocsPath = 'apps/blogger/src/config/swagger-docs.js';
  const bloggerServiceUrl = `${process.env["BLOGGER_SERVICE_URL"]}:${process.env['PORT_BLOGGER']}/`;
  const description = 'Blog Management Service';
  const name = 'blogger-service-api';

  ApiRegistration.registerApiToRegistry(bloggerServiceUrl, devDocsPath, dockerDocksPath, description,
    name)
  .then(() => {
    logger.info('Successfully registered to registry');
  })
  .catch(err => {
    logger.error(err);
  });
};

export default registerToRegistry;
