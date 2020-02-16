import userResolver from './userResolver';
import mindResolver from './mindResolver';
import commentResolver from './commentResolver';
import likeResolver from './likeResolver';

export default {
  Mind: {
    ...likeResolver.Mind,
    ...commentResolver.Mind,
  },
  Query: {
    ...mindResolver.Query,
  },
  Mutation: {
    ...commentResolver.Mutation,
    ...userResolver.Mutation,
    ...mindResolver.Mutation,
    ...likeResolver.Mutation,
  },
  Subscription: {
    ...mindResolver.Subscription,
  },
};
