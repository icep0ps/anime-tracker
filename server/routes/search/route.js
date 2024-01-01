import express from 'express';
import Myanimelist from '../../controllers/myanimelist.js';

const router = express.Router();

router.post('/', Myanimelist.search);

export default router;
