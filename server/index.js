import 'dotenv/config';
import path from 'path';
import express from 'express';
import { connect } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers, context } from './graphql';

const app = express();

app.use(express.static('static'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  context,
  playground: true,
});

connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));


server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT || 5000 }, () => console.log(`Apollo Server is listening on ${server.graphqlPath}`));
