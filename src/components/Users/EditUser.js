import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../../actions";

class EditUser extends Component {
  handleSubmit = () => {
    // Using underscore to match api format
    // It should be here???
    const { firstName: first_name, lastName: last_name, jobTitle: job_title } = this.state;
    const hashed_id = this.props.user.hashed_id;
    const { dispatch } = this.props;
    if (first_name.length > 0 && last_name.length > 0) {
      dispatch(userActions.update({ first_name, last_name, job_title, hashed_id }));
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.user && !state.isLoaded) {
      let { first_name: firstName, last_name: lastName, job_title: jobTitle } = props.user;
      jobTitle = jobTitle || "";
      return { firstName, lastName, jobTitle, isLoaded: true };
    }
    return null;
  }

  componentDidMount() {
    this.props.dispatch(userActions.getOne(this.props.match.params.id));
  }

  render() {
    const { firstName, lastName, jobTitle, isLoaded } = this.state;

    if (!isLoaded) {
      return null;
    }

    return (
      <form>
        <TextField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          autoComplete='given-name'
          required
          autoFocus
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={lastName}
          autoComplete='family-name'
          onChange={this.handleChange}
          required
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={jobTitle}
          onChange={this.handleChange}
        />
        <Button component={Link} to="/users">Back to Index</Button>
        <Button onClick={this.handleSubmit}>Update</Button>
      </form>
    )
  }

  state = {
    isLoaded: false,
    firstName: null,
    lastName: null,
    jobTitle: null
  };
}

const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};

export default connect(mapStateToProps)(EditUser);