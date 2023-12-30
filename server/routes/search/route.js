import express from 'express';
import Anilist from '../../controllers/anilist.js';

const router = express.Router();

router.post('/', Anilist.search);

export default router;
