import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';
import {Express} from "express";
import Swagger from "@blogger/util-swagger-docs";
import swaggerDocs from 'comments-service.json';
import 'dotenv/config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Comments Service API docs',
      description: "Responsible for handling comments to articles\n\n" +
        "- Comments are fixed to article id, can be nested to the level 4, based on property depth -> when parent" +
        " comment is on level 4, we set it's parent_id to the newly added comment to stop deeper nesting\n\n" +
        "- The application validates if the article exists when comment is added -> every time article is added or" +
        " deleted in blogger service, blogger service updates the ids of existing article in redis cache (24h), from" +
        " which comments service takes the ids. If any article wouldn't be added/deleted in the last 24 hours and" +
        " cache would be empty. The comments service calls internal api endpoint to obtain the ids and stores them" +
        " in cache it self. In case of blogger service fail, the comment is stored to database with property" +
        " published set to false. Comments service sends message to Blogger service, once Blogger is back online, it" +
        " send back the message, the Comments service loads the fresh data and validates the not published" +
        " articles\n\n" +
        "- When article is deleted in blogger service, the comments are no longer needed -> blogger sends message," +
        " comments service deletes the comments, sends message back and article is deleted too so no non existent" +
        " relations exist in db.\n\n" +
        "- Public endpoints with no auth protection\n\n" +
        "Internal API\n\n" +
        "- not accessible through gateway\n\n" +
        "- protected by x-api-key\n\n" +
        "- for communication with votes service\n\n",
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
    'apps/comments-service/src/config/swagger-docs.js',
    'apps/comments-service/src/app/routers/internal-router.ts'
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
