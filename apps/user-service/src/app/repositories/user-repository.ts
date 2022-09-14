import UserModel, { UserI } from '../models/user-model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Interfaces } from '@blogger/global-interfaces';

const create = async (user: UserI): Promise<UserI> => {
  return await UserModel.create(user);
};

const findByConfirmationToken = async (confirmationToken: string): Promise<UserI> => {
  return await UserModel.findOne({
    where: {
      confirmationToken: confirmationToken,
    },
  });
};

const findByUsername = async (username: string): Promise<UserI> => {
  return await UserModel.findOne({
    where: {
      username: username,
    },
  });
};

const findByEmail = async (email: string): Promise<UserI> => {
  return await UserModel.findOne({
    where: {
      email: email,
    },
  });
};

const findById = async (id: number): Promise<UserI> => {
  return await UserModel.findOne({
    where: {
      id: id,
    },
  });
};

const findByPasswordToken = async (passwordToken: string): Promise<UserI> => {
  return await UserModel.findOne({
    where: {
      forgottenPasswordToken: passwordToken,
    },
  });
};

const findUsernamesIdAvatarsWhereActive = async (): Promise<Interfaces.UserData[]> => {
  return await UserModel.findAll({
    where: {
      active: true
    },
    attributes: {
      exclude: [
        'email', 'password', 'active','confirmationToken', 'confirmationTokenExpiration',
        'forgottenPasswordToken', 'forgottenPasswordTokenExpiration'
      ],
    }
  })
};

export default {
  create,
  findByEmail,
  findByUsername,
  findById,
  findByConfirmationToken,
  findByPasswordToken,
  findUsernamesIdAvatarsWhereActive
};
