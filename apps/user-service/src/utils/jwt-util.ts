import jwt, {Jwt, JwtPayload, SignOptions} from 'jsonwebtoken';
import { UserI } from '../app/models/user-model';

const generateToken = async (user: UserI): Promise<string>  => {
  if (!user.username || !user.password) {
    return null;
  }

  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar
  };

  const signInOption: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '2h',
  };

  const privateKey: string = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign(payload, privateKey, signInOption);
};

export default generateToken;
