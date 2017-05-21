import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import Main from 'Main';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/(:importancy)" component={Main} />
      </Router>
    </Provider>
  );
};

export default Root;
