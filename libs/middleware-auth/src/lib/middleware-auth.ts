import 'dotenv/config';
import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express';
import ApiError from "../../../middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';

export interface CustomRequest extends Request {
  user: string | JwtPayload,
}

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const fullToken = req.headers['Authorization'];
  const token = fullToken.toString().split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    (req as CustomRequest).user = decoded;
    logger.info(`User ${decoded['username']} successfully authorized`);
    next();
  } catch (e: any) {
    logger.error(`Access denied with token: ${token}, error: ${e.message}`);
    next(ApiError.forbidden({error: e.message}));
  }
};

export default {
  authorize
};
