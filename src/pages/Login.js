import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { Container } from "styled-bootstrap-grid";
import { useHistory } from "react-router-dom";

const Login = ({ login, user }) => {
  const [email, setEmail] = useState("Adam@pontepiefarms.com");
  const [password, setPassword] = useState("password");
  const history = useHistory();

  document.title = "Login";

  // if (user) {
  //   history.push("/");
  // }

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password }, () => history.push("/"));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </Container>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { login })(Login);
