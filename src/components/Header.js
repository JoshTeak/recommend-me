import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { resetUser } from '../actions/user';
import { history } from '../routers/AppRouter'; //todo consider importing from a different file.

import { firebase, googleAuthProvider } from '../firebase/firebase';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.displayMenuPopup = "none";
  };
  optionsMenu = () => {    
      if(this.displayMenuPopup === "none")
      {
        this.displayMenuPopup = "block";
      } else if(this.displayMenuPopup === "block")
      {
        this.displayMenuPopup = "none";
      }
      this.forceUpdate();
  }
  resetAlgorithm = () => {
    this.props.resetUser(this.props.auth.uid).then(() => {
      this.optionsMenu();
      history.push({
        pathname: "/seen",
        state: { previousPath: history.location}
      });
    });
  }
  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <div className="list-item--row-end">
              <div className="button-group">
                <button className="button button--options" onClick={this.optionsMenu}>
                  <div className="button-option-icon">
                    <div className="button-option-dot">.</div>
                    <div className="button-option-dot">.</div>
                    <div className="button-option-dot">.</div>
                  </div>
                </button>
              </div>
              {
                this.displayMenuPopup === "none" ? "" : (
                  <div className="dropdown-list">
                    <div className="dropdown-list-body">
                      <div className="dropdown-list-item selectable"  onClick={this.props.startLogout}>
                        <div className="icon-container">
                          <img className="icon" src="/images/Menu-Expand@4x.png" alt="Menu-Expand@4x" />
                        </div>
                        <h3 className="dropdown-list-item__option">Logout</h3>
                      </div>
                      <div className="dropdown-list-item selectable" onClick={this.resetAlgorithm}>
                        <div className="icon-container">
                          <img className="icon" src="/images/Favourite@4x.png" alt="Favourite@4x" />
                        </div>
                        <h3 className="dropdown-list-item__option">Reset</h3>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <h1 className="header__title selectable" onClick={() => {
              if(history.location.pathname !== "/seen")
              {
                history.push({
                  pathname: "/seen",
                  state: { previousPath: history.location}
                });
              }
            }}>Movie Picker</h1>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  resetUser: (id) => dispatch(resetUser(id))
});

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
