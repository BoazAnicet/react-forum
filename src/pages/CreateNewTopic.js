import React, { Component } from "react";
import {
  Container,
  Input,
  TextArea,
  Form,
  Dropdown,
  Segment,
  Grid,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createPost } from "../actions/postActions";
import { isLoggedIn } from "../actions";
import faker from "faker";

const categories = [
  { key: "technology", text: "Tecnology", value: "technology" },
  { key: "finance", text: "Finance", value: "finance" },
  { key: "travel", text: "Travel", value: "travel" },
  { key: "health", text: "Health", value: "health" },
  { key: "design", text: "Design", value: "design" },
  { key: "entertainment", text: "Entertainment", value: "entertainment" },
  { key: "politics", text: "Politics", value: "politics" },
  { key: "style", text: "Style", value: "style" },
  { key: "culture", text: "Culture", value: "culture" }
];

class NewPost extends Component {
  componentDidMount() {
    this.props.isLoggedIn(
      success => {},
      fail => this.props.history.push("/login")
    );
  }

  // state = {
  //   title: "",
  //   body: "",
  //   category: "",
  //   author: faker.name.findName()
  // };
  state = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(5, "\n\n"),
    category: categories[Math.floor(Math.random(categories.length))],
    author: faker.name.findName()
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.createPost(
      this.state,
      () => {
        this.setState({
          title: "",
          body: "",
          category: ""
        });
        setTimeout(
          () => this.props.history.push(`/post/${this.props.post._id}`),
          1000
        );
      },
      () => {}
    );
  };

  render() {
    const { title, body } = this.state;
    return (
      <Container>
        <Grid centered>
          <Grid.Column widescreen="12" mobile="16">
            <Segment>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field
                  control={Input}
                  value={title}
                  name="title"
                  label="Title"
                  required
                  onChange={this.handleChange}
                />
                <Form.Field>
                  <Dropdown
                    placeholder="Category"
                    fluid
                    selection
                    options={categories}
                    name="category"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <TextArea
                    onChange={this.handleChange}
                    name="body"
                    value={body}
                    required
                  />
                </Form.Field>
                <Button type="submit">Post</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = ({ post }) => ({ post });

export default connect(mapStateToProps, { createPost, isLoggedIn })(NewPost);
