import ApiError from "../error/api-error";
import {Request, Response, NextFunction} from 'express';

const apiErrorHandler = (err: TypeError | ApiError, req: Request, res: Response,
                         next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json('Something went wrong');
};

export default apiErrorHandler;
