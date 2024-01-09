import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import LocalStrategy from 'passport-local';

import Auth from './controllers/auth.js';
import Home from './controllers/home.js';

import authRoute from './routes/auth/route.js';
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
      next();
    };

    app.use(cors());
    app.use(errorHandler);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      session({
        secret: Locals.config().secret,
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy({ passReqToCallback: true }, Auth.authenticate));

    app.get('/', exposeDatabase, Home.load);
    app.use('/auth', exposeDatabase, authRoute);
    app.use('/entry', exposeDatabase, entryRoute);
    app.use('/search', searchRoute);

    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => console.log(`Listening on port ${port}`));
    }
    return app;
  }
}

export default App;
