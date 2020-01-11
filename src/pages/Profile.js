import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Loader } from "semantic-ui-react";
import { isLoggedIn } from "../actions";

class Profile extends Component {
  //// http://127.0.0.1:3000/profile
  componentDidMount() {
    this.props.isLoggedIn(
      success => {},
      fail => this.props.history.push("/login")
    );
  }

  render() {
    return this.props.user ? (
      <Container>
        <div>{this.props.user.firstName || "firstName"}</div>
      </Container>
    ) : (
      <Container>
        <Loader active>Loading</Loader>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { isLoggedIn })(Profile);
