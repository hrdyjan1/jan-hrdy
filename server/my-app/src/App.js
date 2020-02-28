import React from 'react';
import ApolloClient from 'apollo-client'
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'


const GET_MINDS_QUERY = gql`
    query {
        getMinds{
            id
        }
    }
`

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export const Home = () => {
    return (
        <p>home</p>
    )
}

export const WillMatch = () => {
    return (
        <div>
            <Query query={GET_MINDS_QUERY}>
                {({loading, error, data}) => {
                    console.log('data', data)
                    return (
                        <p>You lou</p>
                    )}}
            </Query>
            <p>WillMatch</p>
        </div>

    )
}

export const NoMatch = () => {
    return (
        <p>NoMatch</p>
    )
}



function App() {
  return (
      <ApolloProvider client={client}>
        <Router>
            <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/will-match">Will Match</Link></li>
                <li><Link to="/will-not-match">Will Not Match</Link></li>
                <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
            </ul>

            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/will-match" component={WillMatch}/>
                <Route path="*" component={NoMatch} />
                <Route path="/*/*" component={NoMatch} />
                <Route component={NoMatch} />
            </Switch>
            </div>
        </Router>
      </ApolloProvider>
  );
}

export default App;
