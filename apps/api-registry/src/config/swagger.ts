import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import { version } from '../../../../package.json';

export const options: swaggerJsdoc.Options = {
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
