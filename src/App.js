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
import SettingsEmail from "./pages/SettingsEmail";
import SettingsPassword from "./pages/SettingsPassword";
import SettingsDelete from "./pages/SettingsDelete";
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
    // eslint-disable-next-line
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
          {/* <Route exact path="/forums/:category" component={Category} /> */}
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/thread/new" component={NewThread} />
          <Route exact path="/thread/:id" component={Thread} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/error" component={ErrorPage} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute
            exact
            path="/settings/email"
            component={SettingsEmail}
          />
          <PrivateRoute
            exact
            path="/settings/password"
            component={SettingsPassword}
          />
          <PrivateRoute
            exact
            path="/settings/delete"
            component={SettingsDelete}
          />
          <Route path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      )}
    </>
  );
};
