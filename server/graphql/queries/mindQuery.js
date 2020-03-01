import uniqid from 'uniqid';
import { AuthenticationError } from 'apollo-server';

import { validateMind } from '../../utils/validators';
import { Mind } from '../../models';
import authChecker from '../../utils/authChecker';

const subscriptionType = {
  NEW_MIND: 'NEW_MIND',
};

export const newMindSubscribe = {
  subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(subscriptionType.NEW_MIND),
};

export const createMind = async (_, args, context) => {
  const { createdMind } = args;
  const { head, body } = createdMind;

  validateMind(head, body);
  const user = authChecker(context);

  const id = uniqid('id-');

  const newMind = new Mind({
    id,
    head,
    body,
    createdAt: new Date().toISOString(),
    userId: user.id,
    comments: [],
    likes: [],
  });

  const mind = await newMind.save();

  context.pubsub.publish(subscriptionType.NEW_MIND, {
    newMindSubscribe: mind,
  });

  return {
    id: mind.id,
    head: mind.head,
    body: mind.body,
    userId: mind.userId,
    createdAt: mind.createdAt,
    comments: mind.comments,
    likes: mind.likes,
    commentCount: mind.comments.length,
    likeCount: mind.likes.length,
  };
};

export const deleteMind = async (_, args, context) => {
  const { mindId } = args;
  const user = authChecker(context);
  try {
    const mind = await Mind.findOne({ id: mindId });
    if (!mind) {
      throw new Error('Mind not founded.');
    }
    if (mind.userId === user.id) {
      await mind.delete();
      return 'Mind deleted successfully.';
    }
    throw new AuthenticationError('Mind of different user.');
  } catch (error) {
    throw new Error(error);
  }
};

export const getMind = async (_, args) => {
  const { mindId } = args;
  try {
    return await Mind.findOne({ id: mindId });
  } catch (error) {
    throw new Error('Mind not founded.');
  }
};

export const getMinds = async () => {
  try {
    return await Mind.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error('Minds not founded.');
  }
};
