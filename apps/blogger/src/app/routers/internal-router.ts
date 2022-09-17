import {Router} from "express";
import Validator from '@blogger/middleware-validator';
import {getArticleIdsSchema} from "../schemas/get-article-ids-schema";
import InternalController from "../controllers/internal-controller";

const InternalRouter: Router = Router();

InternalRouter.get('/blogger-service-api/internal/articles', Validator.validate(getArticleIdsSchema),
  InternalController.showArticleIds);

export default InternalRouter;

/**
 *
 * @openapi
 * '/blogger-service-api/internal/articles':
 *  get:
 *     tags:
 *     - InternalBloggerAPI
 *     summary: To retrieve article ids for comments service to check if article exists
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
 *                type: number
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

