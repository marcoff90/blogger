import { NextFunction, Request, Response } from "express";
import UserService from "../services/user-service";
import {GetUsersDataInput} from "../schemas/get-users-data-schema";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {Interfaces} from '@blogger/global-interfaces';

const showUsersData = async (req: Request<GetUsersDataInput['headers']>, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === process.env['USER_SERVICE_API_KEY']) {
    const data: Interfaces.UserData[] = await UserService.mapUsers();
    res.send(data);
  } else {
    next(ApiError.unauthorized({error: `Access denied`}));
  }
};

export default {
  showUsersData
};
