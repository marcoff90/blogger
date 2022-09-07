import logger from '@blogger/util-logger';
import axios from "axios";
import 'dotenv/config';
import {Interfaces} from '@blogger/global-interfaces';

const registerApiToRegistry = async (userServiceApiURL: string, devDocsPath: string,
                                     dockerDocksPath: string, description: string, name: string) => {
  logger.info(`Registering ${name} to registry`);

  const registryUrl = process.env['REGISTRY_URL'];
  const apiKey = process.env['API_REGISTRY_KEY'];
  const registryPort = process.env['PORT_REGISTRY'];

  const requestData: Interfaces.RegisterServerInput = {
    url: userServiceApiURL,
    description: description,
    name: name,
    apis: [
      {
        path: devDocsPath
      },
      {
        path: dockerDocksPath
      }
    ]
  };

  await axios.post(`${registryUrl}:${registryPort}/api-registry/servers`, requestData, {
    headers: {
      'x-api-key': apiKey
    }
  })
};

export default {
  registerApiToRegistry
};
