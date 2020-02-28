import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  id: String,
  username: String,
  password: String,
  createdAt: String,
  email: String,
});

export default model('User', userSchema);
