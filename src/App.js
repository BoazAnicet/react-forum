import React from "react";

import { Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";
import { Navbar } from "./components";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Topic from "./pages/Topic";
import ErrorPage from "./pages/404";
import NewThread from "./pages/NewThread";
import Login from "./pages/Login";

import { connect } from "react-redux";

import { isLoggedIn } from "./actions";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";

import CssBaseline from "@material-ui/core/CssBaseline";
import Thread from "./pages/Thread";

class App extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn(
      success => {},
      fail => {}
    );
  }

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
        <CssBaseline />

        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/forum" />
          </Route>
          <Route exact path="/forum" component={Home} />
          <Route exact path="/forum/:category" component={Category} />
          {/* <this.PrivateRoute exact path="/profile" component={Profile} /> */}
          <Route exact path="/profile" component={Profile} />
          {/* <this.PrivateRoute exact path="/post/new-post" component={NewTopic} /> */}
          <Route exact path="/thread/new" component={NewThread} />
          <Route exact path="/thread/:id" component={Thread} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/post/:id" component={Topic} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/error" component={ErrorPage} />
          <Route path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { isLoggedIn })(App);
