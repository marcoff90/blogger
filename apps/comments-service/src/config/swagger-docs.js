/**
 * @openapi
 * '/comments-service-api/articles/{articleId}/comments':
 *  post:
 *     tags:
 *      - CommentsServiceAPI
 *     summary: Create Comment for article
 *     parameters:
 *      - in: path
 *        name: articleId
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateCommentInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateCommentResponse'
 *      404:
 *        description: Not found - article not found by id
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
 * '/comments-service-api/articles/{articleId}/comments':
 *  get:
 *     tags:
 *      - CommentsServiceAPI
 *     summary: Get comments for article
 *     parameters:
 *      - in: path
 *        name: articleId
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
 *                $ref: '#/components/schemas/GetCommentsResponse'
 *      404:
 *        description: Not found - article not found by id
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
 *
 * @openapi
 * components:
 *  schemas:
 *    CreateCommentInput:
 *      type: object
 *      required:
 *        - author
 *        - content
 *      properties:
 *        author:
 *          type: string
 *          default: John Doe
 *        content:
 *          type: string
 *          default: Loving this content
 *        parent_id:
 *          type: number
 *          default: 1
 *    CreateCommentResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        depth:
 *          type: number
 *        created_at:
 *          type: number
 *        author:
 *          type: string
 *        content:
 *          type: string
 *        parent_id:
 *          type: number
 *        article_id:
 *          type: number
 *    GetCommentsResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        author:
 *          type: string
 *        content:
 *          type: string
 *        article_id:
 *          type: number
 *        parent_id:
 *          type: number
 *        depth:
 *          type: number
 *        created_at:
 *          type: number
 *        children:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/GetCommentsResponse'
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
 *    ApiMessage:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */
