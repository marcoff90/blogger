import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import { version } from '../../../../package.json';

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API registry docs',
      description: 'Stores APIs data and retrieves them for API Gateway',
      contact: {
        name: 'Marek Slavicek',
      },
      version,
    },
    servers: [
      {
        url: 'http://localhost:4444',
        description: 'API registry'
      },
    ],
  },
  apis: [
    'apps/api-registry/src/app/routers/*.ts',
    'apps/api-registry/src/app/schemas/*.ts',
  ],
};
