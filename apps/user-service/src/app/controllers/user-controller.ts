import {NextFunction, Request, Response} from 'express';
import logger from '@blogger/util-logger';
import {
  ActivateUserAccountInput,
  CreateUserInput,
  ForgottenUserPasswordInput,
  IdentifyUserByResetTokenInput,
  LoginUserInput,
  ResetPasswordInput,
} from '../schemas/user-schema';
import UserService from '../services/user-service';
import {UserI} from '../models/user-model';
import generateToken from '../../utils/jwt-util';
import {Interfaces} from '@blogger/global-interfaces';
import bcrypt from 'bcryptjs';
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {CreateUserResponse} from "../interfaces/create-user-response";
import {LoginUserResponse} from "../interfaces/login-user-response";
import {ActivationResponse} from "../interfaces/activation-response";

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
    next(ApiError.conflict({error: e.message}));
  }
};

const showLogin = async (req: Request<LoginUserInput['body']>, res: Response, next: NextFunction
) => {
  const loggedUser: UserI = await UserService.login(req.body);

  const token: string =
    loggedUser !== null ? await generateToken(loggedUser) : null;

  if (!token) {
    next(ApiError.unauthorized({error: "At least one of the fields doesn't match!"}));

  } else {
    if (!loggedUser.active) {
      next(ApiError.forbidden({error: 'Confirm the account through email confirmation!'}));

    } else {
      const response: LoginUserResponse = {
        token: token,
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
    next(ApiError.badRequest({error: "Email doesn't match any user"}));
  } else {
    await UserService.forgottenPassword(req.body.email);
    const response: Interfaces.ApiMessage = {
      message: 'Email with reset link sent',
    };
    res.json(response);
  }
};

const resetPassword = async (req: Request<ResetPasswordInput['body'], ResetPasswordInput['query']>, res: Response,
  next: NextFunction) => {
  const timeNow = Date.now() / 1000;
  const user: UserI = await UserService.findByEmail(req.body.email);

  if (!user) {
    next(ApiError.badRequest({error: 'User not found'}));

  } else if (user.forgottenPasswordToken !== req.query.token) {
    next(ApiError.badRequest({error: 'Reset token not associated with email address!'}));

  } else if (bcrypt.compareSync(req.body.password, user.password)) {
    next(ApiError.badRequest({error: 'Password cannot be same as it was!'}));

  } else if (timeNow > user.forgottenPasswordTokenExpiration) {
    next(ApiError.badRequest({error: 'Token expired!'}));

  } else {
    await UserService.resetPassword(req.body.email, req.body.password);
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
    next(ApiError.notFound({error: 'Token not assigned to user!'}));

  } else if (timeNow > user.confirmationTokenExpiration) {
    await UserService.generateNewConfirmationToken(req.query.token.toString());
    next(ApiError.forbidden({error: 'Token expired! Check email for new one!'}));

  } else {
    const user: UserI = await UserService.confirmAccount(req.query.token.toString(), req.body.avatar);
    const token: string = await generateToken(user);
    const response: ActivationResponse = {
      username: user.username,
      active: user.active,
      avatar: user.avatar,
      token,
    };
    res.json(response);
  }
};

const identifyUserByResetToken = async (req: Request<IdentifyUserByResetTokenInput['query']>, res: Response,
                                        next: NextFunction) => {
  const user: UserI = await UserService.findByPasswordToken(req.query.token.toString());

  if (!user) {
    next(ApiError.notFound({error: 'Token not assigned to user!'}));
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
};
