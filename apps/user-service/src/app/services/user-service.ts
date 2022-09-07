import UserRepository from '../repositories/user-repository';
import Mailer from '../../utils/mailer';
import TokenGenerator from '../../utils/token-generator';
import bcrypt from 'bcryptjs';
import { UserI } from '../models/user-model';
import logger from '@blogger/util-logger';

const create = async (user: UserI) => {
  user.password = bcrypt.hashSync(user['password'], 5);
  const token: string = await TokenGenerator.generateConfirmationToken();
  const expiration: number = Math.round(Date.now() / 1000 + 86400);
  user.confirmationToken = token;
  user.confirmationTokenExpiration = expiration;
  const savedUser: UserI = await UserRepository.create(user);
  await Mailer.sendConfirmationMail(user.email, token, user.username);
  logger.info(`Created user ${savedUser.username} id: ${savedUser.id}`);
  return savedUser;
};

const findByConfirmationToken = async (confirmationToken: string) => {
  return await UserRepository.findByConfirmationToken(confirmationToken);
};

const confirmAccount = async (confirmationToken: string, avatar: string) => {
  const user: UserI = await UserRepository.findByConfirmationToken(
    confirmationToken
  );
  user.active = true;
  user.avatar = avatar;
  user.confirmationToken = null;
  user.confirmationTokenExpiration = null;
  await user.save();
  logger.info(`Account confirmed for user ${user.username}`);
  return user;
};

const generateNewConfirmationToken = async (confirmationToken: string) => {
  const user: UserI = await UserRepository.findByConfirmationToken(
    confirmationToken
  );
  const token: string = await TokenGenerator.generateConfirmationToken();
  const expiration: number = Math.round(Date.now() / 1000 + 86400);
  user.confirmationToken = token;
  user.confirmationTokenExpiration = expiration;
  await Mailer.sendConfirmationMail(user.email, token, user.username);
  await user.save();
  logger.info(`Generated new confirmation token for user ${user.username}`);
  return token;
};

const login = async (user: UserI) => {
  const userInDb: UserI = await UserRepository.findByUsername(user.username);
  const doesPasswordMatch: boolean =
    userInDb && bcrypt.compareSync(user.password, userInDb.password);
  logger.info(`Logging in user ${user.username}: result ${doesPasswordMatch}`);
  return doesPasswordMatch ? userInDb : null;
};

const forgottenPassword = async (userEmail: string) => {
  const user: UserI = await UserRepository.findByEmail(userEmail);
  const token: string = await TokenGenerator.generatePasswordToken();
  const expiration: number = Math.round(Date.now() / 1000 + 86400);
  user.forgottenPasswordToken = token;
  user.forgottenPasswordTokenExpiration = expiration;
  await user.save();
  await Mailer.sendPasswordResetMail(userEmail, token, user.username);
  logger.info(`Generated reset password token for user ${user.username}`);
};

const resetPassword = async (userEmail: string, password: string) => {
  const user: UserI = await UserRepository.findByEmail(userEmail);
  user.password = bcrypt.hashSync(password, 5);
  user.forgottenPasswordToken = null;
  user.forgottenPasswordTokenExpiration = null;
  user.active = true;
  await Mailer.confirmPasswordChange(user.email, user.username);
  await user.save();
  logger.info(`Reset password for user ${user.username}`);
};

const findById = async (id: number) => {
  return await UserRepository.findById(id);
};

const findByEmail = async (email: string) => {
  return await UserRepository.findByEmail(email);
};

const findByPasswordToken = async (passwordToken: string) => {
  return await UserRepository.findByPasswordToken(passwordToken);
};

const getUsersAvatar = async (userId: number) => {
  const user: UserI = await UserRepository.findById(userId);
  return user.avatar;
};

export default {
  create,
  login,
  findById,
  forgottenPassword,
  resetPassword,
  findByEmail,
  findByConfirmationToken,
  findByPasswordToken,
  confirmAccount,
  generateNewConfirmationToken,
  getUsersAvatar,
};
