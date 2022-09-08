import {Express, Request, Response} from "express";
import logger from "@blogger/util-logger";
import swaggerJsdoc from '../../../../node_modules/swagger-jsdoc';
import swaggerUi from '../../../../node_modules/swagger-ui-express';
import {writeFileSync, readFileSync} from "fs";


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

const swaggerDocsDocker = (app: Express, port: number, swaggerDocument: any) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });
  logger.info(`Documentation available at http:localhost:${port}/docs`);
};

const saveSwaggerDocsToJson = (options: swaggerJsdoc.Options, apiName: string) => {
  // saving swagger spec to json on dev load -> copied into container, when Swagger Jsdoc doesn't run, so we use json for docs
  const swaggerSpec = swaggerJsdoc(options);
  const jsonContent = JSON.stringify(swaggerSpec);

  const textInFile = readFileSync(`${apiName}.json`);

  if (textInFile.toString().length !== jsonContent.length) {
    logger.info(`Updating json docs for ${apiName}`);
    writeFileSync(`${apiName}.json`, jsonContent, 'utf8');
    logger.info('File saved');
  } else {
    logger.info(`JSON file of ${apiName} wasn't updated, skipping saving`);
  }
};

export default {
  swaggerDocs,
  swaggerDocsDocker,
  saveSwaggerDocsToJson
};
