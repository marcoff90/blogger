import { Router } from 'express';
import Validator from '@blogger/middleware-validator';
import {
  activateUserAccountSchema,
  createUserSchema,
  forgottenUserPasswordSchema,
  identifyUserByResetTokenSchema,
  loginUserSchema,
  resetUserPasswordSchema,
} from '../schemas/user-schema';
import UserController from '../controllers/user-controller';

const UserRouter = Router();

/**
 * @openapi
 * '/user-service-api/users':
 *  post:
 *     tags:
 *     - UserServiceAPI
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schemas:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
UserRouter.post(
  '/user-service-api/users',
  Validator.validate(createUserSchema),
  UserController.storeUser
);

/**
 * @openapi
 * '/user-service-api/users/login':
 *  post:
 *     tags:
 *     - UserServiceAPI
 *     summary: Logs in a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schemas:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      401:
 *        description: One of the fields doesn't match
 *      403:
 *        description: User didn't confirm the account through email
 *      400:
 *        description: Bad request
 */
UserRouter.post(
  '/user-service-api/users/login',
  Validator.validate(loginUserSchema),
  UserController.showLogin
);

/**
 * @openapi
 * '/user-service-api/users/forgotten-password':
 *  post:
 *     tags:
 *     - UserServiceAPI
 *     summary: Sends email with token to reset password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schemas:
 *              $ref: '#/components/schemas/ForgottenPasswordUserSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/ApiMessage'
 *      400:
 *        description: Bad request - email is not filled or doesn't match any user
 */
UserRouter.post(
  '/user-service-api/users/forgotten-password',
  Validator.validate(forgottenUserPasswordSchema),
  UserController.forgottenPassword
);

/**
 * @openapi
 * '/user-service-api/users/recover':
 *  post:
 *     tags:
 *     - UserServiceAPI
 *     summary: Changes user's password
 *     parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schemas:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schemas:
 *              $ref: '#/components/schemas/ResetPasswordUserSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/ApiMessage'
 *      400:
 *        description: Bad request
 */
UserRouter.post(
  '/user-service-api/users/recover',
  Validator.validate(resetUserPasswordSchema),
  UserController.resetPassword
);

/**
 * @openapi
 * '/user-service-api/users/activate':
 *  post:
 *     tags:
 *     - UserServiceAPI
 *     summary: Activates user account based on query token
 *     parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schemas:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schemas:
 *              $ref: '#/components/schemas/ActivateUserAccountSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/ActivationResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: User not found based on query token
 *      403:
 *        description: Token expired -> generated new one
 */
UserRouter.post(
  '/user-service-api/users/activate',
  Validator.validate(activateUserAccountSchema),
  UserController.activateAccount
);

/**
 * @openapi
 * '/user-service-api/users/identify':
 *  get:
 *     tags:
 *     - UserServiceAPI
 *     summary: Used for FE application when user is accessing the reset password page, the request is sent in order to allow user to access the page
 *     parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schemas:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schemas:
 *              $ref: '#/components/schemas/ApiMessage'
 *      400:
 *        description: Bad request
 *      404:
 *        description: User not found based on query token
 */
UserRouter.get(
  '/user-service-api/users/identify',
  Validator.validate(identifyUserByResetTokenSchema),
  UserController.identifyUserByResetToken
);

export default UserRouter;
