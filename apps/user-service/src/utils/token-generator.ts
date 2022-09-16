import UserService from '../app/services/user-service';
import { UserI } from '../app/models/user-model';

const generateConfirmationToken = async (): Promise<string> => {
  let token = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 24; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // if any user is found with the same token, generate new one
  const user: UserI = await UserService.findByConfirmationToken(token);
  if (user) {
    await generateConfirmationToken();
  }

  return token;
};

const generatePasswordToken = async (): Promise<string> => {
  let token = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 24; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const user: UserI = await UserService.findByPasswordToken(token);
  if (user) {
    await generatePasswordToken();
  }

  return token;
};

export default {
  generateConfirmationToken,
  generatePasswordToken,
};
