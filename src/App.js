import React, { useEffect, useState } from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";
import { Navbar } from "./components";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Topic from "./pages/Topic";
import ErrorPage from "./pages/404";
import NewThread from "./pages/NewThread";
import Login from "./pages/Login";
import Thread from "./pages/Thread";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";

import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "./actions";

import CssBaseline from "@material-ui/core/CssBaseline";
import { CircularProgress } from "@material-ui/core";

const App = props => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(
        isLoggedIn(
          success => setLoading(false),
          fail => setLoading(false)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  return (
    <>
      <CssBaseline />
      <Navbar />
      {loading ? (
        <CircularProgress />
      ) : (
        <Switch>
          <Route exact path="/">
            <Redirect to="/forum" />
          </Route>
          <Route exact path="/forum" component={Home} />
          <Route exact path="/forum/:category" component={Category} />
          {/* <Route exact path="/profile" component={Profile} /> */}
          <PrivateRoute exact path="/profile" component={Profile} />
          {/* <Route exact path="/thread/new" component={NewThread} /> */}
          <PrivateRoute exact path="/thread/new" component={NewThread} />
          <Route exact path="/thread/:id" component={Thread} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/post/:id" component={Topic} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/error" component={ErrorPage} />
          <Route path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
