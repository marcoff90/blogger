/**
 * @openapi
 * '/votes-service-api/articles/{articleId}/comments/{commentId}/votes':
 *  post:
 *     tags:
 *      - VotesService
 *     summary: Create Vote for comment
 *     parameters:
 *      - in: path
 *        name: articleId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: commentId
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/styled/schemas/CreateVoteInput'
 *     responses:
 *      200:
 *        description: Success - Vote annulled - both values send null
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/styled/schemas/ApiMessage'
 *      201:
 *        description: Created - Vote created/updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/styled/schemas/ApiMessage'
 *      202:
 *        description: Accepted - comment id not validated through comments service
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/styled/schemas/ApiMessage'
 *      404:
 *        description: Not found - Comment not found by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/styled/schemas/ApiError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/styled/schemas/ValidationError'
 * @openapi
 * '/votes-service-api/articles/{articleId}/comments/{commentId}/votes':
 *  get:
 *     tags:
 *      - VotesService
 *     summary: Get Vote count for comment
 *     parameters:
 *      - in: path
 *        name: articleId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: commentId
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
 *                $ref: '#/styled/schemas/VotesCount'
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/styled/schemas/ApiError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/styled/schemas/ValidationError'
 * @openapi
 * '/votes-service-api/articles/{articleId}/comments-votes':
 *  get:
 *     tags:
 *      - VotesService
 *     summary: Get All Vote count for article id
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
 *                $ref: '#/styled/schemas/VotesCount'
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/styled/schemas/ApiError'
 *      400:
 *        description: Bad Request
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
 *    CreateVoteInput:
 *      type: object
 *      required:
 *        - upvote
 *        - downvote
 *      properties:
 *        upvote:
 *          type: boolean
 *          default: true
 *          nullable: true
 *        downvote:
 *          type: boolean
 *          default: null
 *          nullable: true
 *    VotesCount:
 *      type: object
 *      properties:
 *        upvotes:
 *          type: number
 *        downvotes:
 *          type: number
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
