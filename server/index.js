import 'dotenv/config';
import path from 'path';
import express from 'express';
import { connect } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers, context } from './graphql';

const app = express();

// It is needed to perform HTTP requests from another domain than your server domain to your server.
// Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.
// app.use(cors());

// Gzip compressing can greatly decrease the size
// of the response body and hence increase the speed of a web app
// app.use(compression());

app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

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

app.listen({ port: process.env.PORT || 5001 }, () => console.log(`Apollo Server is listening on ${server.graphqlPath}`));
