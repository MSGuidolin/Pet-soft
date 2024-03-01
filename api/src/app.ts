import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.routes';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import JWTStrategy from './libs/passport-jwt';
import { createRoles, createService } from './libs/initialSetupRoles';
import GoogleStrategy from 'passport-google-oauth20';
import config from './config';
import Users from './models/Users';
import Providers from './models/Providers';
import Pets from "./models/Pets";
// import fs from 'fs';

const app: Application = express();
createRoles();
createService();

app.set('port', process.env.PORT || 3002);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.urlencoded({ extended: false }));

//authentication passport (read token)
app.use(passport.initialize());
app.use(passport.session());
passport.use(JWTStrategy);

//images test

// var multer = require('multer');

// var storage = multer.diskStorage({
//   destination: (req: any, file: any, cb: any) => {
//     cb(null, path.join(__dirname, '/uploads/'));
//   },
//   filename: (req: any, file: any, cb: any) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// var upload = multer({ storage: storage });

// app.get('/pets', (req, res) => {
//   Pets.find({}, (err: any, items: any) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('An error occurred');
//     }
//     else {
//       res.render('imagesPage', { items: items });
//     }
//   });
// });

// app.post('/pets', upload.single('file'), (req: any, res, next) => {

//   var obj = {
//     name: req.body.name,
//     race: req.body.race,
//     age: req.body.age,
//     animal: req.body.animal,
//     image: {
//       data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//       contentType: 'image/png'
//     }
//   }

//   Pets.create(obj, (err: any, item: any) => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       item.save();
//       res.send('success');
//     }
//   });
// });

//session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//google passport
passport.serializeUser((user: any, done: any) => {
  return done(null, user.id);
});
passport.deserializeUser(async (id: any, done: any) => {
  try {
    const user = await Users.findOne({ id: id });
    if (user) return done(null, id);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
  return done(null, id);
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3002/auth/google/callback',
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      //   Users.find({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      const defaultUser = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        googleId: profile.id,
        password: profile.emails[0].value,
        confirm: true,
      };
      try {
        const provider = await Providers.findOne({
          email: profile.emails[0].value,
        });
        if (provider) {
          return cb(null, provider);
        } else {
          const user = await Users.findOne({ email: profile.emails[0].value });
          if (user) {
            return cb(null, user);
          } else {
            const newUser = new Users(defaultUser);
            await newUser.save();
          }
        }
      } catch (error) {
        console.log(error);
        cb(error, null);
      }

      console.log('PROFILE-->', profile);
      cb(null, profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async function (req: any, res: any) {
    // console.log(req.user);
    // Successful authentication, redirect home.

    res.redirect(`http://localhost:3000/complete/profile/${req.user?.id}`);
  }
);

//

app.use('/', router);
// config Oauth google and db

// storage para guardar img en mi db
// app.use('/uploads', express.static(path.join(__dirname + 'uploads')));
app.use('/upload', express.static(path.join(__dirname + '../uploads')));

export default app;

//id cliente google = 566936992237-joaqbcfmijssrskuvo6ekpkvh4uj59eu.apps.googleusercontent.com
// secret cliente google = wnl5ZzPMEk65iC80cMmGyH_A
