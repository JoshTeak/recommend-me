import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="Login-layout">
    <div className="Login-layout-box">
      <h1 className="login-layout-title">Movie Picker</h1>
      <p>Movie Picker is a web applications that gives users movie recommendations based on their own individual tastes in movies.</p>
      <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
  	<div className="Login-layout-image-box">
		<img src="/images/popcorn movies.jpg" alt="popcorn movies" />
	</div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);