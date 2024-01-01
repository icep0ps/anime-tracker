import express from 'express';
import Database from '../providers/database.js';
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

  static async signup(request, response, next) {
    const errors = validationResult(request);
    if (errors.array().length)
      return response.status(400).render('signup', { errors: errors.array() });

    const user = await Database.create.user(request.body);
    response.redirect('/');
  }

  static async login(request, response, next) {
    const errors = validationResult(request);
    if (errors.array().length)
      return response.status(400).render('login', { errors: errors.array() });

    const { username, password } = request.body;
    const user = await Database.get.user(username, password);
    response.redirect('/');
  }
}

export default Auth;
