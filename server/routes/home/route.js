import express from 'express';
import Home from '../../controllers/home.js';

const router = express.Router();

router.get('/', Home.load);

export default router;
