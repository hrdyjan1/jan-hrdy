import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './styles/App.css';
import './styles/Editor.css';
import { LoginView, OpenMindedView, RegisterView, NewArticleView, CreateArticleView } from './components/views';
import { AuthProvider } from './contexts';
import { Menu } from './components/common';
import { AuthRoute } from './components/routes';
import HomeView from './components/views/HomeView';

const uploadLink = createUploadLink({
  uri: '/graphql'
});

const client = new ApolloClient({
  link: uploadLink,
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
            <Menu />
            <Switch>
              <Route path='/' exact component={HomeView} />
              <Route path='/create-article' exact component={CreateArticleView} />
              <Route path='/open-minded' component={OpenMindedView} />
              <Route path='/articles' component={NewArticleView} />
              <AuthRoute path='/login' component={LoginView} />
              <AuthRoute path='/register' component={RegisterView} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
