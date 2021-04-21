import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { history } from '../routers/AppRouter'; //todo consider importing from a different file.

export class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  };

  goToSeenPage = () => {
    history.push({
      pathname: "/seen",
      state: { previousPath: history.location}
    });
  }

  render() {
    return (
      <div className="page-background">
        <div className="header-row">
          <div className="page-title">
            <h1>Welcome to Movie Picker</h1>
            <div className="landing-view-container">
              <div className="info-segment">
                <h2 className="info-heading">What we do</h2>
                <p className="info-write-up">Our algorithm looks at the movies you like to create a list of recommendations. These recommendations are then ranked to match your taste in movies. The more movies you like/dislike the more accurate our recommendations are. So what are you waiting for? Get started and click button below.</p>
                <button className="button" onClick={this.goToSeenPage}>Get Started</button>
              </div>
              <div className="info-segment">
                <h2 className="info-heading">Instructions</h2>
                <p className="info-write-up">Step one, the Seen page. If you have seen the movie swipe left and if you haven't, swipe right. It’s that simple. Once you’ve seen a few movies, move on to the next step.</p>
                <p className="info-write-up">Step two, the Recommend page. The recommend page shows movies that you’ve seen. Swipe left if you would recommend, and right if you wouldn’t.</p>
                <p className="info-write-up">Step three. After you have recommended at least 10 movies you can view the My List page which will find you movie recommendations based on your taste in movies.</p>
                <p className="info-write-up">That’s everything. Please enjoy!</p>
                <p className="info-write-up">Also don’t forget to login if you want us to remember your recommendations for future use!</p>
                <button className="button" onClick={this.props.startLogin}>Login with Google</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LandingPage);