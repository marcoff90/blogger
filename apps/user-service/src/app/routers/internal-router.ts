import {Router} from "express";
import InternalController from "../controllers/internal-controller";
import {getUsersDataSchema} from "../schemas/get-users-data-schema";
import Validator from '@blogger/middleware-validator';

const InternalRouter: Router = Router();

InternalRouter.get('/user-service-api/internal/users', Validator.validate(getUsersDataSchema), InternalController.showUsersData);

export default InternalRouter;

/**
 *
 * @openapi
 * '/user-service-api/internal/users':
 *  get:
 *     tags:
 *     - InternalUserAPI
 *     summary: To retrieve necessary user data for Blogger Service
 *     parameters:
 *      - in: header
 *        name: x-api-key
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/styled/schemas/UsersDataResponse'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/styled/schemas/ApiError'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/styled/schemas/ValidationError'
 *
 * @openapi
 * styled:
 *  schemas:
 *    UsersDataResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        username:
 *          type: string
 *        avatar:
 *          type: string
 *    ApiError:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *    ValidationError:
 *      type: object
 *      properties:
 *        code:
 *          type: string
 *        expected:
 *          type: string
 *        received:
 *          type: string
 *        path:
 *          type: array
 *          items:
 *            type: string
 *        message:
 *          type: string
 *
 */

