import {NextFunction, Request, Response} from 'express';
import logger from '@blogger/util-logger';
import {CreateUserInput} from '../schemas/create-user-schema';
import UserService from '../services/user-service';
import {UserI} from '../models/user-model';
import generateToken from '../../utils/jwt-util';
import {Interfaces} from '@blogger/global-interfaces';
import bcrypt from 'bcryptjs';
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {CreateUserResponse} from "../interfaces/create-user-response";
import {LoginUserResponse} from "../interfaces/login-user-response";
import {LoginUserInput} from "../schemas/login-user-schema";
import {ForgottenUserPasswordInput} from "../schemas/forgotten-password-schema";
import {ResetPasswordInput} from "../schemas/reset-password-schema";
import {ActivateUserAccountInput} from "../schemas/activate-user-schema";
import {IdentifyUserByResetTokenInput} from "../schemas/identify-user-schema";
import 'dotenv/config';

const storeUser = async (req: Request<CreateUserInput['body']>, res: Response, next: NextFunction) => {
  try {
    const user: UserI = await UserService.create(req.body);

    const response: CreateUserResponse = {
      id: user.id,
      username: user.username,
    };

    return res.json(response);
  } catch (e: any) {
    logger.error(e.message);
    next(ApiError.conflict({error: `Validation error`}));
  }
};

const showLogin = async (req: Request<LoginUserInput['body']>, res: Response, next: NextFunction
) => {
  const loggedUser: UserI = await UserService.login(req.body);

  const token: string =
    loggedUser !== null ? await generateToken(loggedUser) : null;

  if (!token) {
    next(ApiError.unauthorized({error: "Invalid credentials"}));

  } else {
    if (!loggedUser.active) {
      next(ApiError.forbidden({error: 'Finish the activation process'}));

    } else {
      const response: LoginUserResponse = {
        token: token,
        id: loggedUser.id,
        username: loggedUser.username,
        avatar: loggedUser.avatar,
      };
      res.json(response);
    }
  }
};

const forgottenPassword = async (req: Request<ForgottenUserPasswordInput['body']>, res: Response, next: NextFunction) => {
  const user: UserI = await UserService.findByEmail(req.body.email);

  if (!user) {
    next(ApiError.notFound({error: "Invalid credentials"}));
  } else {
    await UserService.forgottenPassword(user);
    const response: Interfaces.ApiMessage = {
      message: 'Reset link sent',
    };
    res.json(response);
  }
};

const resetPassword = async (req: Request<ResetPasswordInput['body'], ResetPasswordInput['query']>, res: Response,
  next: NextFunction) => {
  const timeNow = Date.now() / 1000;
  const user: UserI = await UserService.findByEmail(req.body.email);

  if (!user) {
    next(ApiError.notFound({error: 'Invalid credentials'}));

  } else if (user.forgottenPasswordToken !== req.query.token) {
    next(ApiError.forbidden({error: 'Invalid token!'}));

  } else if (bcrypt.compareSync(req.body.password, user.password)) {
    next(ApiError.badRequest({error: 'Password does not match requirements, try again'}));

  } else if (timeNow > user.forgottenPasswordTokenExpiration) {
    next(ApiError.forbidden({error: 'Token expired'}));

  } else {
    await UserService.resetPassword(user, req.body.password);
    const response: Interfaces.ApiMessage = {
      message: 'Password changed successfully!',
    };
    res.json(response);
  }
};

const activateAccount = async (req: Request<ActivateUserAccountInput['body'], ActivateUserAccountInput['query']>,
  res: Response,
  next: NextFunction) => {

  const timeNow = Date.now() / 1000;
  const user: UserI = await UserService.findByConfirmationToken(
    req.query.token.toString()
  );

  if (!user) {
    next(ApiError.forbidden({error: 'Invalid token'}));

  } else if (timeNow > user.confirmationTokenExpiration) {
    await UserService.generateNewConfirmationToken(user);
    next(ApiError.forbidden({error: 'Token expired! Check email for new one!'}));

  } else {
    const activeUser: UserI = await UserService.confirmAccount(user, req.body.avatar);
    const token: string = await generateToken(user);
    const response: LoginUserResponse = {
      token: token,
      id: activeUser.id,
      username: activeUser.username,
      avatar: activeUser.avatar
    };
    res.json(response);
  }
};

const identifyUserByResetToken = async (req: Request<IdentifyUserByResetTokenInput['query']>, res: Response,
                                        next: NextFunction) => {
  const user: UserI = await UserService.findByPasswordToken(req.query.token.toString());

  if (!user) {
    next(ApiError.forbidden({error: 'Invalid token'}));
  } else {
    const response: Interfaces.ApiMessage = {
      message: 'ok',
    };
    res.json(response);
  }
};

const identifyUserByActivationToken = async (req: Request<IdentifyUserByResetTokenInput['query']>, res: Response,
                                        next: NextFunction) => {
  const user: UserI = await UserService.findByConfirmationToken(req.query.token.toString());

  if (!user) {
    next(ApiError.forbidden({error: 'Invalid token'}));
  } else {
    const response: Interfaces.ApiMessage = {
      message: 'ok',
    };
    res.json(response);
  }
};

export default {
  storeUser,
  showLogin,
  forgottenPassword,
  resetPassword,
  activateAccount,
  identifyUserByResetToken,
  identifyUserByActivationToken
};
