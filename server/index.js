import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import searchRoute from './routes/search/route.js';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(path.resolve(), 'server/views'));

app.use(express.static(path.join(path.resolve(), '/public')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/search', searchRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
