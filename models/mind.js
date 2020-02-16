import { model, Schema } from 'mongoose';

const mindSchema = new Schema({
  id: String,
  head: String,
  body: String,
  userId: String,
  createdAt: String,
  comments: [{
    id: String, body: String, userId: String, createdAt: String,
  }],
  likes: [{ id: String, userId: String, createdAt: String }],
});

export default model('Mind', mindSchema);
