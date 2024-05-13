import crypto from 'crypto';
import { validationResult } from 'express-validator';

class Auth {
  static page = {
    signup(request, response, next) {
      return response.render('signup');
    },
    login(request, response, next) {
      if (request.session.messages)
        return response.status(400).render('login', { error: request.session.messages });
      return response.render('login');
    },
  };

  static async login(request, response, next) {
    const errors = validationResult(request);

    if (request.session.messages)
      return response.status(400).render('login', { error: req.session.messages });

    if (errors.array().length)
      return response.status(400).render('login', { errors: errors.array() });
    return response.redirect('/');
  }

  static logout(request, response, next) {
    request.logout(function (err) {
      if (err) {
        return next(err);
      }
      return response.redirect('/');
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
        try {
          const sql = request.db.connect();
          const results =
            await sql`INSERT INTO "User" (username, password, email, salt) VALUES (${request.body.username}, ${hashedPassword}, ${request.body.email}, ${salt}) RETURNING *`;

          const user = {
            id: results[0],
            username: request.body.username,
          };

          request.login(user, function (err) {
            if (err) {
              return next(err);
            }

            return response.redirect('/');
          });
        } catch (err) {
          return next(err);
        }
      }
    );
  }

  static async authenticate(request, username, password, cb) {
    try {
      const user = await request.db.get.user(username);
      if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          const userpassword =
            typeof user.password === 'string'
              ? Buffer.from(user.password, 'hex')
              : user.password;

          if (!crypto.timingSafeEqual(userpassword, hashedPassword)) {
            return cb(null, false, { message: 'Incorrect username or password.' });
          }
          return cb(null, user);
        }
      );
    } catch (error) {
      console.error('Error executing SQL query:', error.message);
    }
  }
}

export default Auth;
