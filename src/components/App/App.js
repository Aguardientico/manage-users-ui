import CssBaseline from "@material-ui/core/CssBaseline";
import React, { Component, Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../AuthRoute";
import Header from "../Header"
import Home from "../Home";
import NonAuthRoute from "../NonAuthRoute";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import EditUser from "../Users/EditUser";
import ListUser from "../Users/ListUser";
import NewUser from "../Users/NewUser";
import ShowUser from "../Users/ShowUser";

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline/>
        <div className="app">
          <Header/>
          <Switch>
            <Route
              path="/"
              exact
              component={Home}
            />
            <NonAuthRoute
              path="/sign_in"
              component={SignIn}
            />
            <NonAuthRoute
              path="/sign_up"
              component={SignUp}
            />
            <AuthRoute
              path="/users"
              exact
              component={ListUser}
            />
            <AuthRoute
              path="/users/new"
              exact
              component={NewUser}
            />
            <AuthRoute
              path="/users/:id"
              exact
              component={ShowUser}
            />
            <AuthRoute
              path="/users/:id/edit"
              exact
              component={EditUser}
            />
            <Route component={Home}/>
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default App;
