import IconButton from "@material-ui/core/IconButton/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShowIcon from "@material-ui/icons/Visibility";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../../actions";
import Paginator from "./Paginator";
import Search from "./Search";

class ListUser extends Component {
  deleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      this.props.dispatch(userActions.remove(id));
    }
  };

  componentDidMount() {
    this.props.dispatch(userActions.getAll({ term: this.props.term }));
  }

  render() {
    const { users } = this.props;

    return (
      <Fragment>
        <Search/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">First Name</TableCell>
              <TableCell component="th">Last Name</TableCell>
              <TableCell component="th">Job Title</TableCell>
              <TableCell component="th">Email</TableCell>
              <TableCell>
                <Tooltip title="Add New">
                  <IconButton component={Link} to="/users/new">
                    <AddIcon/>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(user =>
                <TableRow key={user.hashed_id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.job_title}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Tooltip title="Show">
                      <IconButton component={Link} to={`/users/${user.hashed_id}`}>
                        <ShowIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton component={Link} to={`/users/${user.hashed_id}/edit`}>
                        <EditIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => {this.deleteUser(user.hashed_id)}}>
                        <DeleteIcon/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <Paginator/>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { users, term } = state.user;
  return { users, term };
};

export default connect(mapStateToProps)(ListUser);