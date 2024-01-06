import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import Home from './controllers/home.js';
import authRoute from './routes/auth/route.js';
import entryRoute from './routes/entry/route.js';
import searchRoute from './routes/search/route.js';
import errorHandler from './middleware/errorHandler.js';

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
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

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
