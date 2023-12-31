import express from 'express';
import Auth from '../../controllers/auth.js';
import Validator from '../../middleware/validator.js';

const router = express.Router();

router.get('/login', Auth.page.login);
router.get('/signup', Auth.page.signup);

router.post('/login', Validator.login, Auth.login);
router.post('/signup', Validator.signup, Auth.signup);

export default router;
