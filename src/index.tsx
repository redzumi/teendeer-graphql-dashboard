import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import App from './components/App/App';
import { bootstrap } from './vendors';

import './index.less';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTc1MGYzNDRhZDEzZjcyZjI1YmZkZGUiLCJuYW1lIjoiVGVzdHVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.sIAg7SzptNB0qzzdQi2NZTte3ciGu4A2ASYVMhH5kSM';
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

bootstrap();
