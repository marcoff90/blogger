import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import {Express} from "express";
import Swagger from "@blogger/util-swagger-docs";
import swaggerDocs from 'comments-service.json'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Comments Service API docs',
      description: "TBD",
      contact: {
        name: 'Marek Slavicek',
      },
      version,
    },
    servers: [
      {
        url: `${process.env['COMMENTS_SERVICE_URL_VISIBLE']}:${process.env['PORT_COMMENTS']}`,
        description: 'Comments Management Service'
      },
    ],
  },
  apis: [
    'apps/comments-service/src/config/swagger-docs.js'
  ],
};

export const generateSwaggerDocs = (app: Express, port: number): void => {
  const isDocker = process.env.DOCKER;
  if (isDocker === 'true') {
    Swagger.swaggerDocsDocker(app, port, swaggerDocs);
  } else {
    Swagger.saveSwaggerDocsToJson(options, 'comments-service');
    Swagger.swaggerDocs(app, port, options);
  }
};
