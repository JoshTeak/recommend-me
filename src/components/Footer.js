import React from 'react';
import { history } from '../routers/AppRouter'; //todo consider importing from a different file.

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.displayMenuPopup = "none";
  };

  render() {
    return (
      <footer className="footer">
        <div className="footer__links">
          <button className="button button--link" onClick={() => {
            if(history.location.pathname !== "/seen")
            {
              history.push({
                pathname: "/seen",
                state: { previousPath: history.location}
              });
            }
          }}>
          <div className="icon-container">
            <img className="icon" src="/images/Cursor.png" alt="Cursor" />
          </div>
          </button>
          <button className="button button--link" onClick={() => {
            if(history.location.pathname !== "/recommend")
            {
              history.push({
                pathname: "/recommend",
                state: { previousPath: history.location}
              });
            }
          }}>
          <div className="icon-container">
            <img className="icon" src="/images/Star.png" alt="Star" />
          </div>
          </button>
          <button className="button button--link" onClick={() => {
            if(history.location.pathname !== "/find")
            {
              history.push({
                pathname: "/find",
                state: { previousPath: history.location}
              });
            }
          }}>
          <div className="button--link-selector">
            <div className="icon-container">
              <img className="icon" src="/images/Light Bulb.png" alt="Light Bulb" />
            </div>
          </div>
          </button>
        </div>
      </footer>
    );
  };
};

export default Footer;
