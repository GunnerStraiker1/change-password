import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'


const GRAPHCMS_API = 'https://api-dev.miconcierge.mx/graphql'

const httpLink = createHttpLink({
  uri: GRAPHCMS_API,
})

const authLink = setContext((_, {headers})=>{
  const token = localStorage.getItem('token');
  return{
    headers: {
      ...headers,
      authorization: token ? `Bearer '${token}'` : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));
