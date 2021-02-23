import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { startSetUser } from './actions/user';
import { startReadMovies } from './actions/moviesList';
import { startReadUsers } from './actions/users';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


import unirest from 'unirest';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    store.dispatch(startReadMovies()).then(() => {
      store.dispatch(startSetUser(firebase.auth().currentUser.uid)).then(() => {
        store.dispatch(startReadUsers(firebase.auth().currentUser.uid)).then(() => {
          ReactDOM.render(jsx, document.getElementById('app'));
        });
      });
    });
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetUser(user.uid));
    store.dispatch(startReadMovies());
    store.dispatch(startReadUsers(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/seen');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

