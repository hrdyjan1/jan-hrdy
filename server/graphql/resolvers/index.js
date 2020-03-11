import userResolver from './userResolver';
import mindResolver from './mindResolver';
import commentResolver from './commentResolver';
import likeResolver from './likeResolver';
import articleResolver from './articleResolver';

export default {
  Mind: {
    ...likeResolver.Mind,
    ...commentResolver.Mind,
  },
  Query: {
    ...mindResolver.Query,
    ...articleResolver.Query,
  },
  Mutation: {
    ...commentResolver.Mutation,
    ...userResolver.Mutation,
    ...mindResolver.Mutation,
    ...likeResolver.Mutation,
    ...articleResolver.Mutation,
  },
  Subscription: {
    ...mindResolver.Subscription,
  },
};
