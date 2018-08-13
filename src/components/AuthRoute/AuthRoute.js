import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class AuthRoute extends Component {
  render() {
    const { component: Component, loggedIn, isAdmin, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isAdmin
            ? <Component {...props} />
            : loggedIn
            ? <Redirect to='/'/>
            : <Redirect to={`/sign_in?redirect_to=${props.location.pathname}${props.location.search}`}/>
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.auth;
  return { loggedIn, isAdmin: loggedIn && user.is_admin };
};

export default connect(mapStateToProps)(AuthRoute);