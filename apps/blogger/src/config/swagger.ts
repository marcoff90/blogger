import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import {Express} from "express";
import Swagger from "@blogger/util-swagger-docs";
import swaggerDocs from 'blogger-service.json'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogger Service API docs',
      description: 'TBD',
      contact: {
        name: 'Marek Slavicek',
      },
      version,
    },
    servers: [
      {
        url: `${process.env['BLOGGER_SERVICE_URL_VISIBLE']}:${process.env['PORT_BLOGGER']}`,
        description: 'Blogger Management Service'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          name: 'authorization',
          in: 'headers'
        }
      }
    }
  },
  apis: [
    'apps/blogger/src/config/swagger-docs.js'
  ],
};

export const generateSwaggerDocs = (app: Express, port: number) => {
  const isDocker = process.env.DOCKER;
  if (isDocker === 'true') {
    Swagger.swaggerDocsDocker(app, port, swaggerDocs);
  } else {
    Swagger.saveSwaggerDocsToJson(options, 'blogger-service');
    Swagger.swaggerDocs(app, port, options);
  }
};
