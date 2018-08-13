import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../../actions";

class NewUser extends Component {
  handleSubmit = () => {
    // Using underscore to match api format
    // It should be here???
    const {
      firstName: first_name,
      lastName: last_name,
      jobTitle: job_title,
      email,
      password
    } = this.state;
    const { dispatch } = this.props;
    if (first_name.length > 0
      && last_name.length > 0
      && email.length > 0
      && password.length > 0) {
      dispatch(userActions.create({ first_name, last_name, job_title, email, password }));
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { firstName, lastName, jobTitle, email, password } = this.state;

    return (
      <form>
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
          required
          autoComplete="false"
          autoFocus
        />
        <TextField
          label="Password"
          name="password"
          value={password}
          onChange={this.handleChange}
          type="password"
          required
          autoComplete="false"
        />
        <TextField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          autoComplete='given-name'
          required
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
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    password: ""
  }
}

export default connect()(NewUser);