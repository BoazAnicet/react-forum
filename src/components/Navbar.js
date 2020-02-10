import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  makeStyles,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  SvgIcon
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    textDecoration: "none",
    color: "inherit"
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    marginRight: theme.spacing(2)
  },
  toolbar: { padding: 0 },
  avatar: {
    "&:hover": { cursor: "pointer" }
  }
}));

export default props => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <div style={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              className={classes.logo}
              to="/"
              component={props => <Link {...props} />}
            >
              ReactForum
            </Typography>
          </div>
          {user ? (
            <>
              <div
                style={{ display: "flex", alignItems: "center" }}
                className={classes.avatar}
                onClick={handleClick}
              >
                <Avatar
                  alt="me"
                  src={user.photo}
                  // component={Button}
                  // onClick={handleClick}
                  // to="/profile"
                  // className={classes.avatar}
                />
                <Typography style={{ marginLeft: "10px" }}>
                  {user.username}
                </Typography>
                <SvgIcon>
                  <ArrowDropDownIcon />
                </SvgIcon>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/thread/new"
                >
                  New Thread
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/profile/${user._id}`}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/settings">
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(logout());
                  }}
                  component={Link}
                  to="#"
                >
                  Logout
                </MenuItem>
              </Menu>
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
