import { UserInputError } from 'apollo-server';
import { isEmpty } from './helper';

export const validateComment = (body) => {
  const errors = {};

  if (body.trim() === '') {
    errors.email = 'Body must not be empty';
  }

  if (!isEmpty(errors)) {
    throw new UserInputError('Not valid Comment.', { errors });
  }
};

export const validateMind = (head, body) => {
  const errors = {};

  if (head.trim() === '') {
    errors.username = 'Heading must not be empty';
  }
  if (body.trim() === '') {
    errors.email = 'Body must not be empty';
  }

  if (!isEmpty(errors)) {
    throw new UserInputError('Not valid Mind.', { errors });
  }
};

export const validateRegistration = (
  username,
  password,
  confirmPassword,
  email,
) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  if (!isEmpty(errors)) {
    throw new UserInputError('Not valid registration.', { errors });
  }
};

export const validateLogin = (username, password) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  if (!isEmpty(errors)) {
    throw new UserInputError('Not valid login.', { errors });
  }
};
