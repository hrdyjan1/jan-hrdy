import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './styles/App.css';
import { LoginView, OpenMindedView, RegisterView } from './components/views';
import { AuthProvider } from './contexts';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export const Home = () => {
  return <p>homie</p>;
};

export const NoMatch = () => {
  return <p>NoMatch</p>;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/open-minded'>Open Minded</Link>
              </li>
              <li>
                <Link to='/will-not-match'>Will Not Match</Link>
              </li>
              <li>
                <Link to='/login'>Will Not Match</Link>
              </li>
              <li>
                <Link to='/also/will/not/match'>Also Will Not Match</Link>
              </li>
            </ul>

            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/open-minded' component={OpenMindedView} />
              <Route path='/login' component={LoginView} />
              <Route path='/register' component={RegisterView} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
