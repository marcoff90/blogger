import {Router} from 'express';
import validate from "../middlewares/resources-validator";
import {
  activateUserAccountSchema,
  createUserSchema,
  forgottenUserPasswordSchema, identifyUserByResetTokenSchema,
  loginUserSchema, resetUserPasswordSchema
} from "../schema/user-schema";
import UserController from "../controllers/user-controller";

const UserRouter = Router();

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - UserRouter
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
UserRouter.post('/api/users', validate(createUserSchema), UserController.storeUser);

/**
 * @openapi
 * '/api/users/login':
 *  post:
 *     tags:
 *     - UserRouter
 *     summary: Logs in a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      401:
 *        description: One of the fields doesn't match
 *      403:
 *        description: User didn't confirm the account through email
 *      400:
 *        description: Bad request
 */
UserRouter.post('/api/users/login', validate(loginUserSchema),
  UserController.showLogin);

/**
 * @openapi
 * '/api/users/forgotten-password':
 *  post:
 *     tags:
 *     - UserRouter
 *     summary: Sends email with token to reset password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ForgottenPasswordUserSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessage'
 *      400:
 *        description: Bad request - email is not filled or doesn't match any user
 */
UserRouter.post('/api/users/forgotten-password', validate(forgottenUserPasswordSchema),
  UserController.forgottenPassword);

/**
 * @openapi
 * '/api/users/recover':
 *  post:
 *     tags:
 *     - UserRouter
 *     summary: Changes user's password
 *     parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResetPasswordUserSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessage'
 *      400:
 *        description: Bad request
 */
UserRouter.post('/api/users/recover', validate(resetUserPasswordSchema),
  UserController.resetPassword);

/**
 * @openapi
 * '/api/users/activate':
 *  post:
 *     tags:
 *     - UserRouter
 *     summary: Activates user account based on query token
 *     parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ActivateUserAccountSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ActivationResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: User not found based on query token
 *      403:
 *        description: Token expired -> generated new one
 */
UserRouter.post('/api/users/activate', validate(activateUserAccountSchema),
  UserController.activateAccount);

/**
 * @openapi
 * '/api/users/identify':
 *  get:
 *     tags:
 *     - UserRouter
 *     summary: Used for FE application when user is accessing the reset password page, the request is sent in order to allow user to access the page
 *     parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessage'
 *      400:
 *        description: Bad request
 *      404:
 *        description: User not found based on query token
 */
UserRouter.get('/api/users/identify', validate(identifyUserByResetTokenSchema),
  UserController.identifyUserByResetToken);

export default UserRouter;
