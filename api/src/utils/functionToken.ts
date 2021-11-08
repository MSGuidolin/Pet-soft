import { IUser } from '../models/Users';
import { IProvider } from '../models/Providers';
import jwt from 'jsonwebtoken';
import config from '../config';

function createToken(user: IUser | IProvider) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.jwtSecret,
    { expiresIn: 86400 }
  );
}

export default createToken;
