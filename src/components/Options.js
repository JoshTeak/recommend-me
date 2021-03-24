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
  render() {
    return (
      <div className="list-item--row-end">
        <div className="button-group">
          <button className="button button--options" onClick={() => {
            if(history.location.pathname !== "/menu")
            {
              history.push({
                pathname: "/menu",
                state: { previousPath: history.location}
              });
            }
          }}>
          <div className="button-options-selector">
            <div className="icon-container">
              <img className="icon" src="/images/List@4x.png" alt="List@4x" />
            </div>
          </div>
          </button>
        </div>
      </div>
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
