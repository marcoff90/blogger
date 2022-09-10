import logger from '@blogger/util-logger';
import axios from "axios";
import 'dotenv/config';
import {Interfaces} from '@blogger/global-interfaces';
import RabbitManager from "../../../rabbitmq-manager/src/lib/rabbit-manager";

const registerApiToRegistry = async (userServiceApiURL: string, docsPath: string, description: string, name: string) => {
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
        path: docsPath
      }
    ]
  };

  try {
    await axios.post(`${registryUrl}:${registryPort}/api-registry/servers`, requestData, {
      headers: {
        'x-api-key': apiKey
      }
    });
  } catch (e: any) {
    logger.error(`Registration failed ${e.message}; Publishing data to queue ${JSON.stringify(requestData)}`);
    await publishToQueue(requestData);
    throw new Error(e);
  }
};

const publishToQueue = async (message: Interfaces.RegisterServerInput) => {
  const routingKey = process.env['API_REGISTRY_FAIL_KEY'];
  await RabbitManager.publishMessage(routingKey, message);
};

export default {
  registerApiToRegistry
};
