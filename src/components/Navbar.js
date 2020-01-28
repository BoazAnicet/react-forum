// eslint-disable-next-line
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, isLoggedIn } from "../actions";
// import { Menu, Container } from "semantic-ui-react";
import {
  AppBar,
  Toolbar,
  // IconButton,
  Typography,
  Container,
  makeStyles,
  Avatar
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import { Menu } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = props => {
  const classes = useStyles();

  return (
    // <Menu
    //   borderless
    //   pointing
    //   style={{ marginBottom: "30px", position: "sticky", top: 0 }}
    // >
    //   <Container>
    //     <Menu.Item name="home" as={Link} to="/" />
    //     <Menu.Menu position="right">
    //       {this.props.user ? (
    //         <>
    //           <Menu.Item name="new post" as={Link} to="/post/new-post" />
    //           <Menu.Item name="logout" onClick={this.props.logout} />
    //           <Menu.Item
    //             name={this.props.user.firstName}
    //             as={Link}
    //             to="/profile"
    //           />
    //         </>
    //       ) : (
    //         <>
    //           <Menu.Item name="login" as={Link} to="/login" />
    //           <Menu.Item name="sign-up" as={Link} to="/signup" />
    //         </>
    //       )}
    //     </Menu.Menu>
    //   </Container>
    // </Menu>

    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            ReactForum
          </Typography>

          {props.user ? (
            <>
              <Link to="/thread/new">New Thread</Link>
              {/* <Link component={Button} to="/post/new-post">
                New Post
              </Link> */}
              <Button color="primary" onClick={props.logout}>
                Logout
              </Button>
              {/* <Button color="primary" onClick={props.logout}>
                Logout
              </Button> */}
              <Avatar
                alt="me"
                src={props.user.photo}
                component={Link}
                to="/profile"
              />
            </>
          ) : (
            // <Button
            //   color="primary"
            //   component={props => <Link to="/" {...props} />}
            //   >
            //   Login
            //   </Button>

            <Link to="/login">Login</Link>
            // <Link component={Button} to="/login">
            //   Login
            // </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { logout, isLoggedIn })(Navbar);
