import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';
import tempUsersReducer from '../reducers/tempUsers';
import tempUserReducer from '../reducers/tempUser';
import moviesListReducer from '../reducers/moviesList';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      user: userReducer,
      users: usersReducer,
      movies: moviesListReducer,
      tempUser: tempUserReducer,
      tempUsers: tempUsersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
