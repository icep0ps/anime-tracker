import express from 'express';
import passport from 'passport';
import Auth from '../../controllers/auth.js';
import Validator from '../../middleware/validator.js';

const router = express.Router();

router.get('/login', Auth.page.login);
router.get('/signup', Auth.page.signup);

router.post('/logout', Auth.logout);
router.post(
  '/login',
  Validator.login,
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/auth/login',
    },
    function (request, response) {
      console.log(request.user.username);
      response.redirect('/');
    }
  ),
  Auth.login
);
router.post('/signup', Validator.signup, Auth.signup);

export default router;
