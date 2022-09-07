import ServerRepository from "../repositories/server-repository";
import logger from '@blogger/util-logger';
import { Interfaces } from "@blogger/global-interfaces";
import RabbitManager from "@blogger/rabbitmq-manager";
import 'dotenv/config';
import ApiService from "./api-service";

const create = async (server: Interfaces.ServerI) => {
  const storedServer: Interfaces.ServerI = await ServerRepository.findByUrl(server.url);

  if (storedServer) {
    logger.info(`Updating server id: ${storedServer.id}`);
    await ApiService.updateServerApis(storedServer.id, storedServer.apis, server.apis);
    await ServerRepository.update(storedServer);
    logger.info(`Server updated successfully ${storedServer.id}`);
    return storedServer;
  } else {
    const savedServer: Interfaces.ServerI = await ServerRepository.create(server);
    logger.info(`Saved new server with id ${savedServer.id}, url: ${savedServer.url}`);
    return savedServer;
  }
};

const findAll = async () => {
  logger.info('Loading all servers');
  const servers: Interfaces.ServerI[] = await ServerRepository.findAll();
  logger.info(`Found ${servers.length} servers`);
  return servers;
};

const notifyApiGateway = async () => {
  const routingKey = process.env['API_REGISTRY_ROUTING_KEY'];
  const apiMessage: Interfaces.ApiRegistryMessage = {
    serversUpdated: true
  };
  await RabbitManager.publishMessage(routingKey, apiMessage);
};

export default {
  create,
  findAll,
  notifyApiGateway
};
