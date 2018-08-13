import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { authActions } from "../../actions";

class SignIn extends Component {
  handleSubmit = () => {

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email.length > 0 && password.length > 0) {
      dispatch(authActions.signIn({ email, password }));
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, submitted } = this.state;

    return (
      <form>
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
          required
          autoComplete="email"
          autoFocus
          error={submitted && email.length === 0}
        />
        <TextField
          label="Password"
          name="password"
          value={password}
          onChange={this.handleChange}
          type="password"
          required
          autoComplete="password"
          error={submitted && password.length === 0}
        />
        <Button onClick={this.handleSubmit}>Sign In</Button>
      </form>
    )
  }

  state = {
    email: '',
    password: '',
    submitted: false
  };
}

export default connect()(SignIn);