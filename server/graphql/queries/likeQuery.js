import uniqid from 'uniqid';
import { UserInputError } from 'apollo-server';
import authChecker from '../../utils/authChecker';
import { Mind } from '../../models';

/* eslint-disable import/prefer-default-export */

export const likeCount = (parent) => parent.likes.length;

export const likeMind = async (_, args, context) => {
  const { mindId } = args;
  const user = authChecker(context);
  try {
    const mind = await Mind.findOne({ id: mindId });
    if (mind) {
      const index = mind.likes.findIndex((like) => like.userId === user.id);
      if (index < 0) {
        // Like
        const id = uniqid('id-');
        mind.likes.push({ id, userId: user.id, createdAt: new Date().toISOString() });
      } else {
        // Unlike
        mind.likes.splice(index, 1);
      }
      await mind.save();
      return mind;
    }
    throw new UserInputError('Mind not founded.');
  } catch (error) {
    throw new Error(error);
  }
};
