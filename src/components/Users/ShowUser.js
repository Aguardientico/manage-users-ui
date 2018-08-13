import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../../actions";

class ShowUser extends Component {
  componentDidMount() {
    this.props.dispatch(userActions.getOne(this.props.match.params.id));
  }

  render() {
    const { user } = this.props;

    return (
      user &&
      <article>
        <dl>
          <dt>First Name:</dt>
          <dd>{user.first_name}</dd>
          <dt>Last Name:</dt>
          <dd>{user.last_name}</dd>
          <dt>Job Title:</dt>
          <dd>{user.job_title}</dd>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
          <dt>Is Admin?</dt>
          <dd>{user.is_admin ? 'Yes' : 'No'}</dd>
        </dl>
        <Button component={Link} to="/users">Back to Index</Button>
      </article>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};

export default connect(mapStateToProps)(ShowUser);