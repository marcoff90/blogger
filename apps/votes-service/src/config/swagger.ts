import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import {Express} from "express";
import Swagger from "@blogger/util-swagger-docs";
import swaggerDocs from 'comments-service.json'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Votes Service API docs',
      description: "TBD",
      contact: {
        name: 'Marek Slavicek',
      },
      version,
    },
    servers: [
      {
        url: `${process.env['VOTES_SERVICE_URL_VISIBLE']}:${process.env['PORT_VOTES']}`,
        description: 'Votes Management Service'
      },
    ],
  },
  apis: [
    'apps/votes-service/src/config/swagger-docs.js'
  ],
};

export const generateSwaggerDocs = (app: Express, port: number): void => {
  const isDocker = process.env.DOCKER;
  if (isDocker === 'true') {
    Swagger.swaggerDocsDocker(app, port, swaggerDocs);
  } else {
    Swagger.saveSwaggerDocsToJson(options, 'votes-service');
    Swagger.swaggerDocs(app, port, options);
  }
};
