import Button from "@material-ui/core/Button";
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from "../../actions";

class Paginator extends Component {
  handleClick = (page) => () => {
    const { term } = this.props;
    this.props.dispatch(userActions.paginatedFilter({ term, page }));
  };

  render() {
    const { currentPage, totalPages } = this.props;

    return (
      Array(parseInt(totalPages, 10)).fill(0).map((_, numPage) =>
        <Button
          key={numPage}
          variant="fab"
          color={currentPage === (numPage + 1) ? "primary" : "secondary"}
          onClick={this.handleClick(numPage + 1)}
        >
          {numPage + 1}
        </Button>
      )
    )
  }
}

const mapStateToProps = state => {
  const { term, currentPage, totalPages } = state.user;
  return { term, currentPage, totalPages };
};

export default connect(mapStateToProps)(Paginator);