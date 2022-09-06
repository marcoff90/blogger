import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import logger from '@blogger/util-logger';
import Swagger from "@blogger/util-swagger-docs";
import {Express} from "express";
import loadApisData from "./apis-data";
import {Interfaces} from '@blogger/global-interfaces';
import 'dotenv/config';

const generateSwaggerDocs = (app: Express, port: number) => {
  loadApisData()
  .then(data => {
    const {serversData, apisData} = getServersData(data);
    const options = generateSwaggerOptions(serversData, apisData);
    Swagger.swaggerDocs(app, port, options);
  })
  .catch(err => {
    logger.error(err);
  });
};

const getServersData = (data: Interfaces.ServerI[]) => {
  const serversData: Interfaces.SwaggerDocsServer[] = [];
  serversData.push({
    url: process.env['GATEWAY_URL'],
    description: 'API Gateway server'
  })
  const apisData: string[] = [];
  data.map(server => {
    const {url, description} = server;
    const serversApi: Interfaces.ApiI[] = server.apis;
    serversApi.map(api => {
      const {path} = api;
      apisData.push(path);
    });
    serversData.push({url, description});
  });
  return {
    serversData,
    apisData
  };
};

const generateSwaggerOptions = (serversData: Interfaces.SwaggerDocsServer[], apisData: string[]) => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Gateway docs',
        description: 'API Gateway for microservices of Blogger microservices. ' +
          '\n\nIn order to try out the endpoints in Swagger UI, you can use Api gateway server or choose corresponding server from the dropdown\n\n' +
        "The gateway is calling to api registry upon the start to retrieve the data of all the registered apis which " +
          "it uses for creating the proxy -> it compares the apiname which is the path obtained from the docs of each registered api " +
          " and if it finds match it makes the call to the corresponding server using the same path.\n\n" +
          "The data is being cached for 24 hours using redis cache. In case of change, the application is listening on rabbitmq" +
          " exchange queue specific for communication of api registry and gateway and if it recieves the message about update, " +
          "it reloads the data directly",
        contact: {
          name: 'Marek Slavicek',
        },
        version,
      },
      servers: serversData
    },
    apis: apisData
  };
  return options;
};

export default generateSwaggerDocs;
