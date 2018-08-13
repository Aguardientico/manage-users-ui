import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { authActions } from "../../actions";

class Header extends Component {

  handleClick = () => {
    this.props.dispatch(authActions.signOut());
  };

  render() {
    const { loggedIn, isAdmin } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          {isAdmin && <Button component={Link} to="/users">Users</Button>}
          {
            loggedIn
              ? <Button onClick={this.handleClick}>Sign Out</Button>
              : <Fragment>
                <Button component={Link} to="/sign_in">Sign In</Button>
                <Button component={Link} to="/sign_up">Sign Up</Button>
              </Fragment>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.auth;
  return { loggedIn, isAdmin: loggedIn && user.is_admin };
};

export default connect(mapStateToProps)(Header);