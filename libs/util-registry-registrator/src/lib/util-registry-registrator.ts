import logger from '@blogger/util-logger';
import axios from "axios";
import 'dotenv/config';
import {Interfaces} from '@blogger/global-interfaces';

const registerApiToRegistry = async (userServiceApiURL: string, schemaPath: string,
                                     routerPath: string, description: string, name: string,
                                     registryUrl: string, apiKey: string) => {
  logger.info(`Registering ${name} to registry`);

  const requestData: Interfaces.RegisterServerInput = {
    url: userServiceApiURL,
    description: description,
    name: name,
    apis: [
      {
        path: schemaPath
      },
      {
        path: routerPath
      }
    ]
  };

  await axios.post(`${registryUrl}/api-registry/servers`, requestData, {
    headers: {
      'x-api-key': apiKey
    }
  })
};

export default {
  registerApiToRegistry
};
