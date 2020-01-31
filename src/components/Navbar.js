import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { logout, isLoggedIn } from "../actions";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  makeStyles,
  Avatar
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    marginRight: theme.spacing(2)
  },
  toolbar: { padding: 0 }
}));

const Navbar = props => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(state => state.user);

  const logout = () => {
    props.logout();
    // history.push("/");
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            className={classes.logo}
            to="/"
            component={props => <Link {...props} />}
          >
            ReactForum
          </Typography>
          {user ? (
            <>
              <Link to="/thread/new" className={classes.link}>
                <Typography>New Thread</Typography>
              </Link>
              <Link to="/" className={classes.link} onClick={logout}>
                <Typography>Logout</Typography>
              </Link>
              <Avatar
                alt="me"
                src={user.photo}
                component={Link}
                to="/profile"
              />
            </>
          ) : (
            <>
              <Link to="/login" className={classes.link}>
                <Typography>Login</Typography>
              </Link>
              <Link to="/signup" className={classes.link}>
                <Typography>Sign Up</Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default connect(null, { logout, isLoggedIn })(Navbar);
