import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import { version } from '../../../../package.json';
import 'dotenv/config';
import {Express} from "express";
import swaggerDocs from 'api-registry.json';
import Swagger from '@blogger/util-swagger-docs';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API registry docs',
      description: "Application has simple idea -> each of the application in the architecture sends automatic" +
        "post request to the server to store it's data so the api gateway can display and use them. Since any of the applications " +
        "can be restarted at any point without api gateway knowing it, the api registry sends message through rabbit mq, which " +
        "is a trigger for api gateway to load the data directly from api registry",
      contact: {
        name: 'Marek Slavicek',
      },
      version,
    },
    servers: [
      {
        url: `${process.env['REGISTRY_URL_VISIBLE']}:${process.env['PORT_REGISTRY']}`,
        description: 'API registry'
      },
    ],
  },
  apis: [
    'apps/api-registry/src/config/swagger-docs.js'
  ],
};

export const generateSwaggerDocs = (app: Express, port: number): void => {
  const isDocker = process.env.DOCKER;
  if (isDocker === 'true') {
    Swagger.swaggerDocsDocker(app, port, swaggerDocs);
  } else {
    Swagger.saveSwaggerDocsToJson(options, 'api-registry');
    Swagger.swaggerDocs(app, port, options);
  }
};
