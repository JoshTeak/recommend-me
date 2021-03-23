import React from 'react';
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
