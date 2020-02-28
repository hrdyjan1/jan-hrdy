import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default (context) => {
  // context = { ... headers }
  const { authorization } = context.req.headers;
  if (authorization) {
    // Bearer ....
    const token = authorization.split('Bearer ')[1];
    if (token) {
      try {
        return jwt.verify(token, process.env.SECRET_TOKEN_KEY);
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};
