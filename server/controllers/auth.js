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

    await request.db.create.user(request.body).catch((error) => next(error));
    return response.redirect('/');
  }

  static async login(request, response, next) {
    const errors = validationResult(request);
    if (errors.array().length)
      return response.status(400).render('login', { errors: errors.array() });

    const { username, password } = request.body;
    await request.db.get.user(username, password).catch((error) => next(error));
    return response.redirect('/');
  }
}

export default Auth;
