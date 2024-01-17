import express from 'express';
import passport from 'passport';
import Auth from '../../controllers/auth.js';
import Validator from '../../middleware/validator.js';

const router = express.Router();

router.get('/login', Auth.page.login);
router.get('/signup', Auth.page.signup);

router.get('/logout', Auth.logout);
router.post(
  '/login',
  Validator.login,
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
  }),
  Auth.login
);
router.post('/signup', Validator.signup, Auth.signup);

export default router;
