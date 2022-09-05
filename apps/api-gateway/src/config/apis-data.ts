import logger from "@blogger/util-logger";
import axios, {AxiosResponse} from "axios";
import {Interfaces} from '@blogger/global-interfaces';

const loadApisData = async () => {
  const registryUrl = process.env['REGISTRY_URL'];
  const apiKey = process.env['API_REGISTRY_KEY'];

  logger.info('Loading servers data from registry');

  const res: AxiosResponse = await axios.get(`${registryUrl}/api-registry/servers`, {
    headers: {
      'x-api-key': apiKey
    }
  });
  const serversData: Interfaces.ServerI[] = res.data
  logger.info(`Successfully loaded data: ${JSON.stringify(serversData)}`);
  return serversData;
};

export default loadApisData;
