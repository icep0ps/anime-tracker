import express from 'express';
import { validationResult } from 'express-validator';

class Auth {
  static page = {
    login(request, response, next) {
      response.render('login');
    },
    signup(request, response, next) {
      response.render('signup');
    },
  };

  static signup(request, response, next) {
    const errors = validationResult(request);
    if (errors.array().length)
      return response.status(400).render('signup', { errors: errors.array() });

    response.redirect('/');
  }

  static login(request, response, next) {
    const errors = validationResult(request);
    if (errors.array().length)
      return response.status(400).render('login', { errors: errors.array() });

    response.redirect('/');
  }
}

export default Auth;
