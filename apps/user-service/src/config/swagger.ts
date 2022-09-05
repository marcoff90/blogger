import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import { version } from '../../../../package.json';

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API docs',
      description: 'TBD',
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
    'apps/user-service/src/app/routers/*.ts',
    'apps/user-service/src/app/schemas/*.ts',
  ],
};
