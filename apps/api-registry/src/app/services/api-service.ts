import { Interfaces } from '@blogger/global-interfaces';
import logger from '@blogger/util-logger';
import ApiRepository from "../repositories/api-repository";

const updateServerApis = async (serverId: number, apis: Interfaces.ApiI[],
                                updatedApis: Interfaces.Path[]) => {
  logger.info(`Updating apis for server ${serverId}`);

  const apisToDelete: Interfaces.ApiI[] = compareApisAndPaths(apis, updatedApis);
  const apisToCreate: Interfaces.Path[] = compareApisAndPaths(updatedApis, apis);

  logger.info(`${apisToDelete.length} apis to delete: ${JSON.stringify(apisToDelete)}`);
  for (const api of apisToDelete) {
    logger.info(`Deleting api ${api.path} associated with server ${serverId}`);
    await api.destroy();
    logger.info(`Delete successful`);
  }

  logger.info(`${apisToCreate.length} apis to create: ${JSON.stringify(apisToCreate)}`);
  for (const api of apisToCreate) {
    logger.info(`Creating api ${api.path} associated with server ${serverId}`);
    await ApiRepository.create(api.path, serverId);
    logger.info(`Creating successful`);
  }
};

const compareApisAndPaths = (arrayOne, arrayTwo) => {
  return arrayOne.filter(object1 => {
    return !arrayTwo.some(object2 => {
      return object1.path === object2.path;
    });
  });
};

export default {
  updateServerApis
};
