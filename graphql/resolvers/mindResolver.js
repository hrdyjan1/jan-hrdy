import {
  getMind, getMinds, createMind, deleteMind, newMindSubscribe,
} from '../queries';

export default {
  Query: {
    getMind,
    getMinds,

  },
  Mutation: {
    createMind,
    deleteMind,
  },
  Subscription: {
    newMindSubscribe,
  },
};
