import UserModel, {UserI} from "../models/user-model";
import "core-js/stable";
import "regenerator-runtime/runtime";

const create = async (user: UserI) => {
  return await UserModel.create(user);
};

const findByConfirmationToken = async (confirmationToken: string) => {
  return await UserModel.findOne({
    where: {
      confirmationToken: confirmationToken
    }
  });
};

const findByUsername = async (username: string) => {
  return await UserModel.findOne({
    where: {
      username: username
    }
  });
};

const findByEmail = async (email: string) => {
  return await UserModel.findOne({
    where: {
      email: email
    }
  });
};

const findById = async (id: number) => {
  return await UserModel.findOne({
    where: {
      id: id
    }
  });
};

const findByPasswordToken = async (passwordToken: string) => {
  return await UserModel.findOne({
    where: {
      forgottenPasswordToken: passwordToken
    }
  });
};

export default {
  create,
  findByEmail,
  findByUsername,
  findById,
  findByConfirmationToken,
  findByPasswordToken
};
