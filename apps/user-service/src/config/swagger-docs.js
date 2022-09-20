/**
 * @openapi
 * '/user-service-api/users':
 *  post:
 *     tags:
 *     - UserService
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
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 */

/**
 * @openapi
 * '/user-service-api/users/login':
 *  post:
 *     tags:
 *     - UserService
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
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 *      401:
 *        description: Unauthorized - some of the fields doesn't match
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *      403:
 *        description: Forbidden - user is not active
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 */

/**
 * @openapi
 * '/user-service-api/users/forgotten-password':
 *  post:
 *     tags:
 *     - UserService
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
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 *      404:
 *        description: Not found - user email
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *
 * @openapi
 * '/user-service-api/users/recover':
 *  post:
 *     tags:
 *     - UserService
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
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - type: array
 *                  items:
 *                    $ref: '#/components/schemas/ValidationError'
 *                - $ref: '#/components/schemas/ApiError'
 *      403:
 *        description: Forbidden - token expired or token not assigned to user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *      404:
 *        description: Not found - user not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *
 * @openapi
 * '/user-service-api/users/activate':
 *  post:
 *     tags:
 *     - UserService
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
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 *      403:
 *        description: Forbidden - token expired, token not assigned to user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *
 * @openapi
 * '/user-service-api/users/reset-identify':
 *  get:
 *     tags:
 *     - UserService
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
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 *      403:
 *        description: Unauthorized - token not assigned to user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 * @openapi
 * '/user-service-api/users/confirm-identify':
 *  get:
 *     tags:
 *     - UserService
 *     summary: Used for FE application when user is accessing the activation page, the request is sent in order to allow user to access the page
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
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 *      403:
 *        description: Unauthorized - token not assigned to user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - passwordConfirmation
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: john.doe@example.com
 *        username:
 *          type: string
 *          default: JohnDoe99
 *        password:
 *          type: string
 *          default: Password123!
 *        passwordConfirmation:
 *          type: string
 *          default: Password123!
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        username:
 *          type: string
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: JohnDoe99
 *        password:
 *          type: string
 *          default: Password123!
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        id:
 *          type: number
 *        username:
 *          type: string
 *        avatar:
 *          type: string
 *    ForgottenPasswordUserSchema:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: john.doe@example.com
 *    ApiMessage:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *    ResetPasswordUserSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: john.doe@example.com
 *        password:
 *          type: string
 *          default: Password123!
 *        passwordConfirmation:
 *          type: string
 *          default: Password123!
 *    ActivateUserAccountSchema:
 *      type: object
 *      required:
 *        - avatar
 *      properties:
 *        avatar:
 *          type: string
 *          default: assets/avatar.jpg
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
 */
