import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, isLoggedIn } from "../actions";
import { Menu, Container } from "semantic-ui-react";

class Navbar extends Component {
  render() {
    return (
      <Menu
        borderless
        pointing
        style={{ marginBottom: "30px", position: "sticky", top: 0 }}
      >
        <Container>
          <Menu.Item name="home" as={Link} to="/" />
          <Menu.Menu position="right">
            {this.props.user ? (
              <>
                <Menu.Item name="new post" as={Link} to="/post/new-post" />
                <Menu.Item name="logout" onClick={this.props.logout} />
                <Menu.Item
                  name={this.props.user.firstName}
                  as={Link}
                  to="/profile"
                />
              </>
            ) : (
              <>
                <Menu.Item name="login" as={Link} to="/login" />
                <Menu.Item name="sign-up" as={Link} to="/signup" />
              </>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { logout, isLoggedIn })(Navbar);
