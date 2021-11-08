import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import config from '../config';
import Users from '../models/Users';

export default new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async function (payload, done) {
    try {
      const user = Users.findById(payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);
