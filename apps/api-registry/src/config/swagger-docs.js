/**
 * @swagger
 * '/api-registry/servers':
 *  post:
 *     tags:
 *      - RegistryAPI
 *     summary: Store a server's data or update if server exists
 *     parameters:
 *      - in: header
 *        name: x-api-key
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateServerInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateServerResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 * @swagger
 * '/api-registry/servers':
 *  get:
 *     tags:
 *     - RegistryAPI
 *     summary: Get all available servers' data
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
 *              $ref: '#/components/schemas/CreateServerResponse'
 *      500:
 *        description: Something went wrong
 *      404:
 *        description: Servers not found
 * @swagger
 * components:
 *  schemas:
 *    CreateServerInput:
 *      type: object
 *      required:
 *        - url
 *        - description
 *        - name
 *        - apis
 *      properties:
 *        url:
 *          type: string
 *          default: http://localhost:3000
 *        description:
 *          type: string
 *          default: User Management Api
 *        name:
 *          type: string
 *          default: user-service-api
 *        apis:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateApiInput'
 *    CreateApiInput:
 *      type: object
 *      properties:
 *        path:
 *          type: string
 *          default: apps/user-service/src/app/routers/user-router.ts
 *    CreateApiResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        path:
 *          type: string
 *        server_id:
 *          type: number
 *    ShowAllServersResponse:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/CreateServerResponse'
 *    CreateServerResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        description:
 *          type: string
 *        url:
 *          type: string
 *        name:
 *          type: string
 *        apis:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateApiResponse'
 *
 */
