import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import logger from '@blogger/util-logger';
import Swagger from "@blogger/util-swagger-docs";
import {Express} from "express";
import loadApisData from "./apis-data";
import {Interfaces} from '@blogger/global-interfaces';

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
          '\n\nIn order to try out the endpoints in Swagger UI, switch the server to corresponding API and execute commands',
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
