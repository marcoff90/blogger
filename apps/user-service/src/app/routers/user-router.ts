import { Router } from 'express';
import Validator from '@blogger/middleware-validator';
import {createUserSchema} from '../schemas/create-user-schema';
import UserController from '../controllers/user-controller';
import {loginUserSchema} from "../schemas/login-user-schema";
import {forgottenUserPasswordSchema} from "../schemas/forgotten-password-schema";
import {resetUserPasswordSchema} from "../schemas/reset-password-schema";
import {activateUserAccountSchema} from "../schemas/activate-user-schema";
import {identifyUserByResetTokenSchema} from "../schemas/identify-user-schema";

const UserRouter: Router = Router();

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
  '/user-service-api/users/reset-identify',
  Validator.validate(identifyUserByResetTokenSchema),
  UserController.identifyUserByResetToken
);

UserRouter.get(
  '/user-service-api/users/confirm-identify',
  Validator.validate(identifyUserByResetTokenSchema),
  UserController.identifyUserByActivationToken
);

export default UserRouter;
