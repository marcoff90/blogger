import { Router } from 'express';
import Validator from '@blogger/middleware-validator';
import {
  activateUserAccountSchema,
  createUserSchema,
  forgottenUserPasswordSchema,
  identifyUserByResetTokenSchema,
  loginUserSchema,
  resetUserPasswordSchema,
} from '../schemas/user-schema';
import UserController from '../controllers/user-controller';

const UserRouter = Router();

UserRouter.post(
  '/user-service-api/users',
  Validator.validate(createUserSchema),
  UserController.storeUser
);

UserRouter.post(
  '/user-service-api/users/login',
  Validator.validate(loginUserSchema),
  UserController.showLogin
);

UserRouter.post(
  '/user-service-api/users/forgotten-password',
  Validator.validate(forgottenUserPasswordSchema),
  UserController.forgottenPassword
);

UserRouter.post(
  '/user-service-api/users/recover',
  Validator.validate(resetUserPasswordSchema),
  UserController.resetPassword
);

UserRouter.post(
  '/user-service-api/users/activate',
  Validator.validate(activateUserAccountSchema),
  UserController.activateAccount
);

UserRouter.get(
  '/user-service-api/users/identify',
  Validator.validate(identifyUserByResetTokenSchema),
  UserController.identifyUserByResetToken
);

export default UserRouter;
