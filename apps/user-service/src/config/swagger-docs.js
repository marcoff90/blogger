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
 *    ActivationResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        active:
 *          type: boolean
 *        avatar:
 *          type: string
 *        token:
 *          type: string
 */
