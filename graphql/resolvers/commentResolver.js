import { createComment, deleteComment, commentCount } from '../queries';

export default {
  Mind: {
    commentCount,
  },
  Mutation: {
    createComment,
    deleteComment,
  },
};
