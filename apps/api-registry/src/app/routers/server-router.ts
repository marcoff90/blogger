import {Router} from "express";
import ServerController from "../controllers/server-controller";
import Validator from '@blogger/middleware-validator';
import {createServerSchema} from "../schemas/server-schema";

const ServerRouter = Router();
/**
 * @openapi
 * '/api-registry/servers':
 *  post:
 *     tags:
 *      - RegistryAPI
 *     summary: Store a server's data or update if server exists
 *     parameters:
 *      - in: headers
 *        name: x-api-key
 *        required: true
 *        schemas:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schemas:
 *            $ref: '#/components/schemas/CreateServerInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/CreateServerResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
ServerRouter.post('/api-registry/servers', Validator.validate(createServerSchema), ServerController.storeServer);

/**
 * @openapi
 * '/api-registry/servers':
 *  get:
 *     tags:
 *     - RegistryAPI
 *     summary: Get all available servers' data
 *     parameters:
 *      - in: headers
 *        name: x-api-key
 *        required: true
 *        schemas:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/CreateServerResponse'
 *      500:
 *        description: Something went wrong
 *      404:
 *        description: Servers not found
 */
ServerRouter.get('/api-registry/servers', ServerController.showAll);
export default ServerRouter;
