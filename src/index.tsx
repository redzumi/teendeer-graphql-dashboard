import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import App from './components/App/App';
import { store } from './tools/store';
import { bootstrap } from './vendors';

import './index.less';

const link = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  link,
  cache: new InMemoryCache(),
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
