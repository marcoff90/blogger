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
      description: "Responsible for handling articles, both public and admin side\n\n" +
        "The application can host multiple blogs, one blog per registered user through user service\n\n" +
        "The access is divided by path variables in each endpoint\n\n" +
        "The application uses redis cache to optimize it's speed of loading in certain cases (more at specific" +
        " endpoints)\n\n\n\n" +
        "Admin side\n\n" +
        "- protected by auth middleware -> jwt obtained upon login through user service\n\n" +
        "- all necessary data about user are in jwt (id, username, ...)\n\n" +
        "- the user must be logged in through user service in order to be use 4 admin endpoints representing CRUD" +
        " operations on user's articles\n\n" +
        "- POST create article\n\n" +
        "- creates article\n\n" +
        "- upon creation, checks if the articles for the author are stored in cache (12 hours), if so, it loads" +
        " the cached data, adds the new article and saves to cache for another 12 hours\n\n" +
        "- GET get articles by userId\n\n" +
        "- shows all users articles in admin POV\n\n" +
        "- checks if users articles are cached, if not, loads from database and saves to cache\n\n" +
        "- PUT update article\n\n" +
        "- DELETE soft delete of article\n\n" +
        "- user as admin has overview of his drafts as well -> on public site are only the articles in state" +
        " 'done'\n\n" +
        "Public side\n\n" +
        "- GET featured blogs\n\n" +
        "- shows up to 5 randomly chosen articles to promote the bloggers\n\n" +
        "- when loading data, it calls to user service to retrieve user data, which it adds to the articles" +
        " (visible username)\n\n" +
        "- the userdata is stored in cache for 24 hours and is used for both featured blogs so find specific" +
        " blog by username -> we have userId at article, we compare the user id with found user data from cache/api" +
        " and assign username to article. If the data isn't" +
        " found in cache (when" +
        " cache is available), the" +
        " app reloads the user service api, stores data in cache and checks if user is there -> if not throws error" +
        " in both cases\n\n" +
        "- the featured articles are stored in cache for 24 hours (every 24 hours, the featured articles" +
        " change)\n\n" +
        "- GET articles by username\n\n" +
        "- username obtained as path variable, compares with data from cache/user api and finds corresponding" +
        " user id; if not found throws error\n\n\n\n" +
        "Internal API\n\n" +
        "- not accessible through gateway\n\n" +
        "- protected by x-api-key\n\n" +
        "- for communication with comments service",

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
    'apps/blogger/src/config/swagger-docs.js',
    'apps/blogger/src/app/routers/internal-router.ts'
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
