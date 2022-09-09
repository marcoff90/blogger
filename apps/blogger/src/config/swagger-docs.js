/**
 * @openapi
 * '/blogger-service-api/articles':
 *  post:
 *     tags:
 *      - BloggerServiceAPI
 *     summary: Create Article
 *     parameters:
 *      - in: header
 *        name: authorization
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateArticleInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateArticleResponse'
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: Bad request
 * @openapi
 * components:
 *  securitySchemas:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *  schemas:
 *    CreateArticleInput:
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
 *
 */
