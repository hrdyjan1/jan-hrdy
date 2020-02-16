import { ApolloServer } from 'apollo-server';
import { connect } from 'mongoose';
import config from './config';
import { typeDefs, resolvers, context } from './graphql';

const server = new ApolloServer({ typeDefs, resolvers, context });

connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: 5000 }))
  .then((res) => console.log(`Server is running at port ${res.url}`))
  .catch((e) => console.log(e));
