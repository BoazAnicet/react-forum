import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { Container, Form, Input, Grid, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Login = ({ login, user }) => {
  const [email, setEmail] = useState("Adam@pontepiefarms.com");
  const [password, setPassword] = useState("password");
  const history = useHistory();
  document.title = "Login";

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password }, () => history.push("/"));
  };

  return (
    <Container>
      <Grid centered>
        <Grid.Column widescreen="six" mobile="16">
          <Segment>
            <Form onSubmit={handleSubmit}>
              {/* <Form.Field>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </Form.Field> */}
              {/* <Form.Field
                id="form-input-control-error-email"
                control={Input}
                label="Email"
                placeholder="user@example.com"
                error={{
                  content: "Please enter a valid email address",
                  pointing: "below"
                }}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name="email"
                required
              /> */}
              <Form.Field
                control={Input}
                label="Email"
                placeholder="user@example.com"
                required
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <Form.Field>
                <label htmlFor="password">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <Form.Button type="submit">Log In</Form.Button>
              </Form.Field>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { login })(Login);
