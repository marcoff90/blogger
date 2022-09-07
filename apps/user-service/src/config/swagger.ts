import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import {version} from '../../../../package.json';

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API docs',
      description: 'Responsible for user management\n\n' +
        "Registration flow:\n\n" +
        "User registers through register endpoint and receives a confirmation email with link" +
        " (the confirmation token is query param) to activate account" +
        " (link is active for 24hours, after that the user gets new token upon trying activating)" +
        " -> without activation the user won't be able to log in and receives an error upon trying\n\n" +
        " During activation of the account user needs to pass avatar string (location of saved avatar on" +
        " the frontend app) and receives back information about the account including access token\n\n" +
        " User is logged in through activation\n\n\n\n" +
        " User can be logged in using username and password on login endpoint and gets back access" +
        " token which works for 2 hours\n\n\n\n" +
        " Account recovery flow:\n\n" +
        " User uses forgotten-password endpoint and receives an email with link to reset password, same as in registration," +
        " the link is active for 24 hours and afterwards the user needs to use the forgotten-password endpoint again\n\n" +
        " The actual password reset is handled on recover endpoint\n\n\n\n" +
        " About the app\n\n" +
        "- the app uses Zod (https://github.com/colinhacks/zod) for input validation\n\n" +
        "- upon starting the database is created (or checked if it's created) and the tables are synced using postgres" +
        " and sequelize\n\n" +
        "- since the application is part of microservices architecture, it's connected to api-registry app, where the" +
        "  data about the app is stored for api-gateway. Whenever the application restarts, it sends post request to api-registry" +
        " to update it's data so the owner of the app doesn't have to"
      ,
      contact: {
        name: 'Marek Slavicek',
      },
      version,
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'User Management Service'
      },
    ],
  },
  apis: [
    'apps/user-service/src/config/swagger-docs.js',
    'swagger-docs.js', // for docker-container
  ],
};
