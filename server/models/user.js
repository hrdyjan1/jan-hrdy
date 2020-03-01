import { model, Schema } from 'mongoose';
import USER_ROLES from '../graphql/userRoles';

const userSchema = new Schema({
  id: String,
  username: String,
  password: String,
  createdAt: String,
  email: String,
  role: { type: String, default: USER_ROLES.USER },
});

export default model('User', userSchema);
