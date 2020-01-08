import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Input,
  Segment,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { signUp } from "../actions";

class SignUp extends Component {
  state = {
    firstName: "test",
    lastName: "user",
    email: "test@user.com",
    password: "hello123",
    passwordConfirm: "hello123"
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    console.log("Form submitted.");
    this.props.signUp(
      this.state,
      () => this.props.history.push("/profile"),
      () => console.log("Something went wrong.")
    );
  };

  render() {
    const {
      email,
      firstName,
      lastName,
      password,
      passwordConfirm
    } = this.state;

    return (
      <Container>
        <Grid centered>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Field
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  label="First Name"
                  control={Input}
                  required
                />
                <Form.Field
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  label="Last Name"
                  control={Input}
                  required
                />
                <Form.Field
                  placeholder="user@example.com"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  label="Email Address"
                  control={Input}
                  type="email"
                  required
                />
              </Form.Group>
              <Form.Field
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
                label="Password"
                control={Input}
                type="password"
                required
              />
              <Form.Field
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={this.handleChange}
                label="Confirm Password"
                control={Input}
                type="password"
                required
              />
              <Button type="submit">Submit</Button>
            </Form>
          </Segment>
        </Grid>
      </Container>
    );
  }
}

export default connect(null, { signUp })(SignUp);
