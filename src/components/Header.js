import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter'; //todo consider importing from a different file.

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <h1 className="header__title selectable" onClick={() => {
          if(history.location.pathname !== "/seen")
          {
            history.push({
              pathname: "/seen",
              state: { previousPath: history.location}
            });
          }
        }}>Recommend Me</h1>
        <button className="button button--logout" onClick={startLogout}>Logout</button>
      </div>
      <div className="header__links">
        <button className="button button--link" onClick={() => {
          if(history.location.pathname !== "/seen")
          {
            history.push({
              pathname: "/seen",
              state: { previousPath: history.location}
            });
          }
        }}>Seen</button>
        <button className="button button--link" onClick={() => {
          if(history.location.pathname !== "/recommend")
          {
            history.push({
              pathname: "/recommend",
              state: { previousPath: history.location}
            });
          }
        }}>Recommend</button>
        <button className="button button--link" onClick={() => {
          if(history.location.pathname !== "/find")
          {
            history.push({
              pathname: "/find",
              state: { previousPath: history.location}
            });
          }
        }}>Find</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
