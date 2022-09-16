import 'dotenv/config';
import {Request, Response, NextFunction} from 'express';
import ApiError from "../../../middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';
import {verify, JwtPayload} from "jsonwebtoken";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const fullToken = req.headers['authorization'];
  const token = fullToken.toString().split(' ')[1];
  try {
    const decoded: string | JwtPayload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    logger.info(`User ${decoded['username']} successfully authorized`);
    next();
  } catch (e: any) {
    logger.error(`Access denied with token: ${token}, error: ${e.message}`);
    next(ApiError.unauthorized({error: e.message}));
  }
};

export default {
  authorize
};
