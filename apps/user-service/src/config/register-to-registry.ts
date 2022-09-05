import logger from '@blogger/util-logger';
import 'dotenv/config';
import ApiRegistration from "@blogger/util-registry-registrator";

const registerToRegistry = () => {
  const routerPath = 'apps/user-service/src/app/routers/*.ts';
  const schemaPath = 'apps/user-service/src/app/schemas/*.ts';
  const userServiceApiURL = process.env["API_URL"];
  const description = 'User Management Service';
  const name = 'user-service-api';
  const registryUrl = process.env['REGISTRY_URL'];
  const apiKey = process.env['API_REGISTRY_KEY'];

  ApiRegistration.registerApiToRegistry(userServiceApiURL, schemaPath, routerPath, description,
    name, registryUrl, apiKey)
  .then(() => {
    logger.info('Successfully registered to registry');
  })
  .catch(err => {
    logger.error(err);
  });
};

export default registerToRegistry;
