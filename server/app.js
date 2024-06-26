import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import LocalStrategy from 'passport-local';

import Auth from './controllers/auth.js';

import authRoute from './routes/auth/route.js';
import homeRoute from './routes/home/route.js';
import entryRoute from './routes/entry/route.js';
import searchRoute from './routes/search/route.js';
import errorHandler from './middleware/errorHandler.js';

import Locals from './providers/locals.js';

class App {
  static init(database) {
    const app = express();
    const port = 3000;

    app.set('view engine', 'pug');
    app.set('views', path.join(path.resolve(), 'server/views'));

    app.use(express.static(path.join(path.resolve(), '/public')));

    const exposeDatabase = (request, response, next) => {
      request.db = database;
      return next();
    };

    app.use(cors());
    app.use(errorHandler);
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(
      // cookie maxAge is set to 24 hours
      session({
        name: 'session',
        secret: Locals.config().secret,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('session', { successRedirect: '/' }));
    passport.use(new LocalStrategy({ passReqToCallback: true }, Auth.authenticate));

    passport.serializeUser(function (user, cb) {
      process.nextTick(function () {
        return cb(null, { id: user.id, username: user.username });
      });
    });
    passport.deserializeUser(async function (user, cb) {
      try {
        const autheduser = await database.get.user(user.username);
        process.nextTick(function () {
          return cb(null, autheduser);
        });
      } catch (error) {
        return cb(`Error authenticating user session: ${error}`);
      }
    });

    app.use(/^(?!\/auth).*$/, (req, res, next) => {
      if (!req.user) return res.redirect('/auth/login');
      res.locals.user = req.user;
      return next();
    });

    app.get('/', exposeDatabase, homeRoute);
    app.use('/auth', exposeDatabase, authRoute);
    app.use('/entry', exposeDatabase, entryRoute);
    app.use('/search', searchRoute);

    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log('App running in ' + process.env.NODE_ENV);
        console.log(`Listening on port ${port}`);
      });
    }

    return app;
  }
}

export default App;
