import {Express, Request, Response} from 'express';
import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import swaggerUi from '../../../../node_modules/swagger-ui-express';
import {version} from '../../../../package.json';
import log from "./logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogger API docs',
      description: 'TBD',
      contact: {
        name: 'Marek Slavicek'
      },
      version
    },
    servers: [
      {
        "url": "http://localhost:3000"
      }
    ],
  },
  apis: ["apps/backend/src/main.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express, port: number) => {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  log.info(`Documentation available at http:localhost:${port}/docs`);
};

export default swaggerDocs;
