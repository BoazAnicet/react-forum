import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "styled-bootstrap-grid";

function Profile({ user }) {
  const history = useHistory();
  // if (!user) {
  //   history.push("/login");
  // }
  const { firstName, lastName } = user;

  return (
    <Container>
      <div>{`Hello, ${firstName}!`}</div>
    </Container>
  );
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Profile);
