import React from 'react';
import ReactDOM from 'react-dom';
import Root from './router';
import configureStore from './store';
import rootSaga from './sagas/rootSaga';
import './styles/app.scss';

const store = configureStore();
store.runSaga(rootSaga);
store.subscribe(() => {
  console.log('App state', store.getState());
});

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);
