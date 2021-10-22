import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import App from './components/App/App';
import { store } from './tools/store';
import { bootstrap } from './vendors';

import './index.less';

// https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTcxOTFiMmIwNmY2MzcxYzBlNjBkMGIiLCJuYW1lIjoiVGVzdHVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.ilxpD1z0KMj63-iDfFNrU9NYKpkOzBjFf4-ihJZgC1s
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTcxOTFiMmIwNmY2MzcxYzBlNjBkMGIiLCJuYW1lIjoiVGVzdHVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.ilxpD1z0KMj63-iDfFNrU9NYKpkOzBjFf4-ihJZgC1s';
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
  credentials: 'include',
});

// TODO: remove store?
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

bootstrap();
