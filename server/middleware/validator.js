import { checkSchema } from 'express-validator';

class Validator {
  static login = checkSchema({
    username: {
      notEmpty: true,
      isLength: {
        options: {
          min: 3,
          max: 16,
        },
        errorMessage: 'Username must be at least 3 chars and at most 16 chars',
      },
    },

    password: {
      trim: true,
      notEmpty: true,
      escape: true,
    },
  });

  static signup = checkSchema({
    username: {
      trim: true,
      notEmpty: true,
      isLength: {
        options: {
          min: 3,
          max: 16,
        },
        errorMessage: 'Username must be at least 3 chars and at most 16 chars',
      },
      escape: true,
    },

    email: {
      trim: true,
      isEmail: true,
      notEmpty: true,
      escape: true,
    },

    password: {
      escape: true,
      notEmpty: true,
    },

    confirm_password: {
      notEmpty: true,
      custom: {
        bail: true,
        options: (value, { req }) => req.body.password === value,
        errorMessage: 'Passwords do not match',
      },
    },
    escape: true,
  });
}

export default Validator;
