import bcrypt from 'bcrypt';
import uniqid from 'uniqid';
import { UserInputError } from 'apollo-server';
import { User } from '../../models';
import { getToken, checkUserExistence } from '../../utils/helper';
import { validateRegistration, validateLogin } from '../../utils/validators';

const getUsers = () => {};

const login = async (_, args) => {
  const { loginUser } = args;
  const { username, password } = loginUser;

  validateLogin(username, password);

  const user = await User.findOne({ username });
  const passwordMatch = await bcrypt.compare(
    password,
    user ? user.password : '',
  );

  if (!passwordMatch || !user) {
    throw new UserInputError('Incorrect credentials.', {
      errors: { general: 'Wrong username or password.' },
    });
  }

  const token = getToken({ id: user.id, email: user.email });

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    token,
  };
};

const register = async (_, args) => {
  const { registerUser } = args;
  const {
    username, password, confirmPassword, email,
  } = registerUser;

  validateRegistration(username, password, confirmPassword, email);
  await checkUserExistence({ email });

  const id = uniqid('id-');
  const token = getToken({ id, email });
  const encryptedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    id,
    email,
    username,
    createdAt: new Date().toISOString(),
    password: encryptedPassword,
  });

  const user = await newUser.save();

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    token,
  };
};

export { login, register, getUsers };
