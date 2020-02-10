import React, { useEffect, useState } from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";
import { Navbar } from "./components";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/404";
import NewThread from "./pages/NewThread";
import Login from "./pages/Login";
import Thread from "./pages/Thread";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import Settings from "./pages/Settings";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "./actions";
import { CircularProgress, CssBaseline, Container } from "@material-ui/core";

export default props => {
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
        <Container>
          <CircularProgress />
        </Container>
      ) : (
        <Switch>
          <Route exact path="/">
            <Redirect to="/forums" />
          </Route>
          <Route exact path="/forums" component={Home} />
          <Route exact path="/forums/:category" component={Category} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/thread/new" component={NewThread} />
          <Route exact path="/thread/:id" component={Thread} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="/settings" component={Settings} />
          <Route path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      )}
    </>
  );
};
