import express from 'express';
import Anime from '../../controllers/anime.js';
const router = express.Router();

router.get('/', Anime.get);
router.post('/', Anime.create);

export default router;
