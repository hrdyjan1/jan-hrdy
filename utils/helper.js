import jsonwebtoken from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import config from '../config';
import { User } from '../models';

export const isEmpty = (obj) => Object.entries(obj).length === 0 && obj.constructor === Object;

export const getToken = (values) => jsonwebtoken.sign(values, config.SECRET_TOKEN_KEY, { expiresIn: '15m' });

export const checkUserExistence = async (values) => {
  const possibilities = Object.keys(values).map((i) => ({ [i]: values[i] }));
  const errors = {};

  await Promise.all(
    possibilities.map(async (possibility) => {
      const user = await User.findOne(possibility);
      if (user) {
        const errorKey = Object.keys(possibility)[0];
        const errorMessage = `${errorKey} is taken`;
        errors[errorKey] = errorMessage;
      }
    }),
  );

  if (!isEmpty(errors)) {
    throw new UserInputError('Already taken.', { errors });
  }
};
