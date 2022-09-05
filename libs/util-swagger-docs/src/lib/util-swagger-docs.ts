import {Express, Request, Response} from "express";
import logger from "@blogger/util-logger";
import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import swaggerUi from '../../../../node_modules/swagger-ui-express';

const swaggerDocs = (app: Express, port: number, options: swaggerJsdoc.Options) => {
  const swaggerSpec = swaggerJsdoc(options);
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  logger.info(`Documentation available at http:localhost:${port}/docs`);
};

export default {
  swaggerDocs
};
