import React from "react";

import { Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";
import { Navbar } from "./components";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Topic from "./pages/Topic";
import ErrorPage from "./pages/404";
import NewTopic from "./pages/CreateNewTopic";

import { BaseCSS } from "styled-bootstrap-grid";

import { connect } from "react-redux";
import Login from "./pages/Login";

class App extends React.Component {
  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        this.props.user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  render() {
    return (
      <>
        <BaseCSS />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <this.PrivateRoute exact path="/profile" component={Profile} />
          <this.PrivateRoute
            exact
            path="/post/new-topic"
            component={NewTopic}
          />
          <Route exact path="/post/:id" component={Topic} />
          <Route exact path="/login" component={Login} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(App);
