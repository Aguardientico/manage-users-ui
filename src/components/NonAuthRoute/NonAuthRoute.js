import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class NonAuthRoute extends Component {
  getParam = (redirectTo) => {
    const url = new URL(window.location.href);
    const param = url.searchParams.get(redirectTo);
    if (param) {
      return decodeURIComponent(param);
    }
    return null;
  };

  render() {
    const {component: Component, loggedIn, ...rest} = this.props;
    const redirectTo = this.getParam("redirect_to");

    return (
      <Route
        {...rest}
        render={props =>
          !loggedIn
            ? <Component {...props} />
            : <Redirect to={redirectTo ? redirectTo : '/'}/>
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.auth;
  return { loggedIn };
};

export default connect(mapStateToProps)(NonAuthRoute);