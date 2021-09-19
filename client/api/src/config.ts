import dotenv from 'dotenv';
dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET || 'secrettoken',
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'usersdb',
  MONGO_USER: process.env.MONGO_USER || 'admin',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID ||
    '566936992237-joaqbcfmijssrskuvo6ekpkvh4uj59eu.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET || 'wnl5ZzPMEk65iC80cMmGyH_A',
};
