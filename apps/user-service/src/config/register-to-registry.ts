import logger from '@blogger/util-logger';
import 'dotenv/config';
import ApiRegistration from "@blogger/util-registry-registrator";

const registerToRegistry = () => {
  const dockerDocksPath = 'swagger-docs.js';
  const devDocsPath = 'apps/user-service/src/config/swagger-docs.js';
  const userServiceApiURL = `${process.env["USER_SERVICE_URL"]}:${process.env['PORT_USER_SERVICE']}/`;
  const description = 'User Management Service';
  const name = 'user-service-api';


  ApiRegistration.registerApiToRegistry(userServiceApiURL, devDocsPath, dockerDocksPath, description,
    name)
  .then(() => {
    logger.info('Successfully registered to registry');
  })
  .catch(err => {
    logger.error(err);
  });
};

export default registerToRegistry;