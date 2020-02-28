import uniqid from 'uniqid';
import { UserInputError, AuthenticationError } from 'apollo-server';
import { validateComment } from '../../utils/validators';
import authChecker from '../../utils/authChecker';
import { Mind } from '../../models';

export const commentCount = (parent) => parent.comments.length;

export const createComment = async (_, args, context) => {
  const { createdComment } = args;
  const { body, mindId } = createdComment;
  validateComment(body);
  const user = authChecker(context);
  const id = uniqid('id-');

  const mind = await Mind.findOne({ id: mindId });
  if (!mind) {
    throw new UserInputError('Mind not founded.');
  }

  const comment = {
    id,
    body,
    userId: user.id,
    createdAt: new Date().toISOString(),
  };

  mind.comments.unshift(comment);

  await mind.save();
  return mind;
};

export const deleteComment = async (_, args, context) => {
  const { deletedComment } = args;
  const { mindId, commentId } = deletedComment;
  const user = authChecker(context);

  const commentFilter = (c) => c.id === commentId;

  try {
    const mind = await Mind.findOne({ id: mindId });
    if (!mind) {
      throw new Error('Mind not founded.');
    }

    const index = mind.comments.findIndex(commentFilter);
    if (index < 0) {
      throw new Error('Comment not founded.');
    }
    if (mind.comments[index].userId === user.id) {
      mind.comments.splice(index, 1);
      await mind.save();
      return mind;
    }
    throw new AuthenticationError('Action not allowed.');
  } catch (error) {
    throw new Error(error);
  }
};
