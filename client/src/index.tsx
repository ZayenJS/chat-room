import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import App from './containers/App/App';

import store from './store';

import './assets/scss/index.scss';
import { apolloClient } from './utils/apollo';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
