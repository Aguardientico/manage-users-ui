import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { userActions } from "../../actions";

class Search extends Component {
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = () => {
    const { term } = this.state;
    this.props.dispatch(userActions.paginatedFilter({ term, page: 1 }));
  };

  componentDidMount() {
    if (this.state.term === null) {
      this.setState({ term: this.props.term || "" });
    }
  };

  render() {
    const { term } = this.state;

    if (term === null) {
      return null;
    }

    return (
      <Fragment>
        <TextField
          placeholder="Search by First Name, Last Name or Job Title"
          fullWidth
          value={term}
          name="term"
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          onClick={this.handleSubmit}
        >
          Search
        </Button>
      </Fragment>
    )
  }

  state = {
    term: null
  };
}

const mapStateToProps = state => {
  const { term } = state.user;
  return { term };
};

export default connect(mapStateToProps)(Search);