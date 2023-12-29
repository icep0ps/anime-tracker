import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import Anime from './controllers/anime.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/anime', Anime.get);

app.post('/anime', Anime.create);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
