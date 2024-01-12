import crypto from 'crypto';
import { validationResult } from 'express-validator';

class Auth {
  static page = {
    signup(request, response, next) {
      response.render('signup');
    },
    login(request, response, next) {
      response.render('login');
    },
  };

  static async login(request, response, next) {
    const errors = validationResult(request);
    if (errors.array().length)
      return response.status(400).render('login', { errors: errors.array() });
  }

  static logout(request, response, next) {
    request.logout(function (err) {
      if (err) {
        return next(err);
      }
      response.redirect('/');
    });
  }

  static async signup(request, response, next) {
    const errors = validationResult(request);
    if (errors.array().length)
      return response.status(400).render('signup', { errors: errors.array() });

    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      request.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        request.db.connection().then((connection) => {
          connection
            .execute({
              sql: 'INSERT INTO user (username, password, email, salt) VALUES (?, ?, ?, ?)',
              values: [request.body.username, hashedPassword, request.body.email, salt],
            })
            .then((results) => {
              const user = {
                id: results[0].insertId,
                username: request.body.username,
              };

              request.login(user, function (err) {
                if (err) {
                  return next(err);
                }

                response.redirect('/');
              });
            })
            .catch((err) => {
              return next(err);
            });
        });
      }
    );
  }

  static async authenticate(request, username, password, cb) {
    request.db.connection().then((connection) => {
      connection
        .execute({
          sql: 'SELECT * FROM user WHERE username = ?',
          values: [username],
        })
        .then((results) => {
          const row = results[0][0];
          if (!row) {
            return cb(null, false, { message: 'Incorrect username or password.' });
          }

          crypto.pbkdf2(
            password,
            row.salt,
            310000,
            32,
            'sha256',
            function (err, hashedPassword) {
              if (err) {
                return cb(err);
              }
              if (!crypto.timingSafeEqual(row.password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
              }
              return cb(null, row);
            }
          );
        });
    });
  }
}

export default Auth;
