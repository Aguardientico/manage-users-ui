import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { loggedIn, user } = this.props;

    return (
      <Fragment>
        <p>Welcome to Manage Users demo.</p>
        {loggedIn && <p>Hi {user.first_name || user.email}</p>}
        {!loggedIn && <p>Please sign in or sign up to use this app</p>}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, loggedIn } = state.auth;
  return { user, loggedIn };
};

export default connect(mapStateToProps)(Home);