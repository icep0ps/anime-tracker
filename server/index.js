import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import Home from './controllers/home.js';
import authRoute from './routes/auth/route.js';
import animeRoute from './routes/anime/route.js';
import searchRoute from './routes/search/route.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(path.resolve(), 'server/views'));

app.use(express.static(path.join(path.resolve(), '/public')));

app.use(cors());
app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', Home.load);
app.use('/auth', authRoute);
app.use('/anime', animeRoute);
app.use('/search', searchRoute);

app.listen(port, () => {
  console.log(`App ready at http://localhost:${port}`);
});
