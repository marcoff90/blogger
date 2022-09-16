import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import {Express} from "express";
import Swagger from "@blogger/util-swagger-docs";
import swaggerDocs from 'graphql-service.json'

/**
 * we need exposed endpoint in gateway, that's why we register graphql api and it's one endpoint
 */

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GraphQL API docs',
      description: "GraphQL API connects the blogger, comments and votes service in matter of read -> it returns the" +
        " full models with all relations loaded from the each service using Apollo Server and RestDataSources\n\n" +
        "GraphQL is connected through gateway so the client still uses single entry point into the ecosystem.\n\n" +
        "In order to try out the Graph import Postman Collection in the 'postman-graphql-api' directory in the root" +
        " directory",
      contact: {
        name: 'Marek Slavicek',
      },
      version,
    },
    servers: [
      {
        url: `${process.env['GRAPHQL_SERVICE_URL_VISIBLE']}:${process.env['PORT_GRAPHQL']}`,
        description: 'GraphQL API'
      },
    ],
  },
  apis: [
    'apps/graphql-blogger/src/config/swagger-docs.js'
  ],
};

export const generateSwaggerDocs = (app: Express, port: number): void => {
  const isDocker = process.env.DOCKER;
  if (isDocker === 'true') {
    Swagger.swaggerDocsDocker(app, port, swaggerDocs);
  } else {
    Swagger.saveSwaggerDocsToJson(options, 'graphql-service');
    Swagger.swaggerDocs(app, port, options);
  }
};
