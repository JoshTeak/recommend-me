import React from 'react';
import { Router, Route, Switch, Link, NavLink, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SeenPage from '../components/SeenPage'; 
import RecommendPage from '../components/RecommendPage';
import FindPage from '../components/FindPage'; 
import MenuPage from '../components/MenuPage';
import LandingPage from '../components/LandingPage'; 
import AdminPage from '../components/ApiToDatabase';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Footer from '../components/Footer';

import { TransitionGroup, CSSTransition } from "react-transition-group";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" exact={true} />
      <Route path="*">
        <Page />
        <Footer />
      </Route>
    </Switch>
  </Router>
);

export const Page = () => {
  let location = useLocation();

  return (
    <div className="body">
      <div className="content-container">
        <TransitionGroup class="transition">
          <CSSTransition
            key={location.key}
            classNames="page-change"
            timeout={500}
            onEnter={(e) => {
              let enteringDirection = Direction('ENTER');
              e.style.transform = `translate(${enteringDirection}%)`
            }}
            onEntering={(e) => {
              e.style.transform = "translate(0%)"
            }}
            onExiting={(e) => {
              let exitingDirection = Direction('EXIT');
              e.style.transform = `translate(${exitingDirection}%)`
            }}
          >
            <Switch location={location}>
              <PrivateRoute path="/landing" component={LandingPage} exact={true}/>
              <PrivateRoute path="/seen" component={SeenPage} />
              <PrivateRoute path="/recommend" component={RecommendPage} />
              <PrivateRoute path="/find" component={FindPage} />
              <PrivateRoute path="/menu" component={MenuPage} />
              <PrivateRoute path="/admin" component={AdminPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

export const Direction = (dir) => {
  const newPathValue = LocationValue(history.location.pathname);
  const oldPathValue = LocationValue(history.location.state.previousPath.pathname);
  if((newPathValue > oldPathValue && dir === 'ENTER') || (newPathValue < oldPathValue && dir === 'EXIT')) {
    return 100;
  } else {
    return -100;
  } 
}

export const LocationValue = (path) => {
  let pathValue;
  switch (path) {
    case '/landing':
      return 0;
    case '/seen':
      return 1;
    case '/recommend':
      return 2;
    case '/find':
      return 3;
    case './menu':
      return 4;
    default:
      return 10;
  }
}

export default AppRouter;
