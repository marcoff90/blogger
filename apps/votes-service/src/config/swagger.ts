import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import {Express} from "express";
import Swagger from "@blogger/util-swagger-docs";
import swaggerDocs from 'votes-service.json'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Votes Service API docs',
      description: "Responsible for handling votes to comments\n\n" +
        "- votes are fixed to comment id, article id and unique ip address -> the combination creates a unique" +
        " primary key and index\n\n" +
        "- The app validates if comment exists when vote is added -> every time comment is added or deleted in" +
        " comment service, the ids of comments are updated/deleted in cache in order to have fresh data of comment" +
        " ids. The votes them self are not cached due to often changes. If any comment wouldn't be added in the last" +
        " 24 hours, the cache would be empty and vote service would call through api to comment service to get the" +
        " ids and store them in cache. If that fails, the vote is saved without being published and later, when" +
        " comment service is back online, the vote is validated and published or deleted in case of error during" +
        " validation\n\n",
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
