import {Router} from "express";
import Validator from '@blogger/middleware-validator';
import {getCommentsIdsSchema} from "../schemas/get-comments-ids-schema";
import InternalController from "../controllers/internal-controller";

const InternalRouter: Router = Router();

InternalRouter.get('/comments-service-api/internal/comments', Validator.validate(getCommentsIdsSchema),
  InternalController.showCommentsIds);

export default InternalRouter;

/**
 *
 * @openapi
 * '/comments-service-api/internal/comments':
 *  get:
 *     tags:
 *     - InternalCommentsAPI
 *     summary: To retrieve comments ids for votes service to check if comment exists
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
 *              $ref: '#/components/schemas/ApiError'
 *      400:
 *        description: Bad request
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
