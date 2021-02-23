import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest                                                 // ...rest allows us to send the rest of the props through to the components 
}) => (
    <div className="page">
      {isAuthenticated ? (
        <Route {...rest} children={(props) => (<Component {...props} />)}/>
      ) : (
          <Redirect to="/" />
        )}
    </div>
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

