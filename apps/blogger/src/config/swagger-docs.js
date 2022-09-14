/**
 * @openapi
 * '/blogger-service-api/bloggers/{userId}/articles':
 *  post:
 *     tags:
 *      - BloggerServiceAPI
 *     summary: Create Article
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUpdateArticleInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateArticleResponse'
 *      403:
 *        description: Forbidden - userId in path doesn't match userId from JWT
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 * @openapi
 * '/blogger-service-api/bloggers/{userId}/articles':
 *  get:
 *     tags:
 *      - BloggerServiceAPI
 *     summary: Get articles for user as admin
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetUserArticlesResponse'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 * @openapi
 * '/blogger-service-api/bloggers/{userId}/articles/{articleId}':
 *  put:
 *     tags:
 *      - BloggerServiceAPI
 *     summary: Update article
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: articleId
 *        required: true
 *        schema:
 *          type: string
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUpdateArticleInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetUserArticlesResponse'
 *      404:
 *        description: Not found - Article not found based on id and user id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 * @openapi
 * '/blogger-service-api/bloggers/{userId}/articles/{articleId}':
 *  delete:
 *     tags:
 *      - BloggerServiceAPI
 *     summary: Delete article
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: articleId
 *        required: true
 *        schema:
 *          type: string
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessage'
 *      404:
 *        description: Not found - Article not found based on id and user id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 * @openapi
 * '/blogger-service-api/blogs/{username}/articles':
 *  get:
 *     tags:
 *      - BloggerServiceAPI
 *     summary: Get all articles by username -> public
 *     parameters:
 *      - in: path
 *        name: username
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
 *                $ref: '#/components/schemas/GetUserArticlesResponse'
 *      404:
 *        description: Not found - Article not found based on id and user id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ValidationError'
 * @openapi
 * '/blogger-service-api/featured-blogs':
 *  get:
 *     tags:
 *      - BloggerServiceAPI
 *     summary: Get featured articles
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetUserArticlesResponse'
 *      500:
 *        description: Something went wrong
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiError'
 *
 * @openapi
 * components:
 *  schemas:
 *    CreateUpdateArticleInput:
 *      type: object
 *      required:
 *        - title
 *        - perex
 *        - content
 *        - image
 *        - state
 *      properties:
 *        title:
 *          type: string
 *          default: My title
 *        perex:
 *          type: string
 *          default: Perex must be at least 50 characters or the request won't go through
 *        content:
 *          type: string
 *          default: Main thing
 *        image:
 *          type: string
 *          default: path to image on frontend app
 *        state:
 *          type: string
 *          default: draft
 *    CreateArticleResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        title:
 *          type: string
 *        state:
 *          type: string
 *        image:
 *          type: string
 *        createdAt:
 *          type: date
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
 *    GetUserArticlesResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        title:
 *          type: string
 *        perex:
 *          type: string
 *        content:
 *          type: string
 *        state:
 *          type: string
 *        image:
 *          type: string
 *        createdAt:
 *          type: date
 *        updatedAt:
 *          type: date
 *        username:
 *          type: string
 *    UpdateArticleResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        title:
 *          type: string
 *        perex:
 *          type: string
 *        content:
 *          type: string
 *        state:
 *          type: string
 *        image:
 *          type: string
 *        createdAt:
 *          type: date
 *        updatedAt:
 *          type: date
 *    ApiMessage:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *
 *
 */
