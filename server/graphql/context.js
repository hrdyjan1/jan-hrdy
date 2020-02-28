import { PubSub } from 'apollo-server';

const pubsub = new PubSub();

export default ({ req }) => ({ req, pubsub });
