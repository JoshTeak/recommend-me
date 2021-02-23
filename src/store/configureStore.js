import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';
import moviesList from '../reducers/moviesList';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      user: userReducer,
      users: usersReducer,
      movies: moviesList
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
