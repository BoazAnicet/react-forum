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

import RichTextEditor from "react-rte";

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

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "LINK_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
    "HISTORY_BUTTONS"
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "custom-css-class" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" }
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: "Normal", style: "unstyled" },
    { label: "Heading Large", style: "header-one" },
    { label: "Heading Medium", style: "header-two" },
    { label: "Heading Small", style: "header-three" }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" }
  ]
};

class NewPost extends Component {
  componentDidMount() {
    this.props.isLoggedIn(
      success => {},
      fail => this.props.history.push("/login")
    );
  }

  state = {
    title: faker.lorem.sentence(),
    // body: faker.lorem.paragraphs(5, "\n\n"),
    body: RichTextEditor.createEmptyValue(),
    category: categories[Math.floor(Math.random(categories.length))],
    author: faker.name.findName()
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { title, category, author } = this.state;
    let body = this.state.body.toString("html");
    console.log(body);

    this.props.createPost(
      { title, body, category, author, createdAt: Date.now() },
      success => this.props.history.push(`/post/${this.props.post._id}`),
      // success => {
      //   this.setState({
      //     title: "",
      //     body: "",
      //     category: ""
      //   });
      //   setTimeout(
      //     () => this.props.history.push(`/post/${this.props.post._id}`),
      //     1000
      //   );
      // },
      fail => {}
    );
  };

  onChange = body => {
    this.setState({ body });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(body.toString("html"));
    }
    console.log(body.toString("html"));
  };

  render() {
    const { title, body } = this.state;
    // console.log(faker.lorem.paragraphs(5, "\n\n"));
    return (
      <Container>
        <Grid centered>
          <Grid.Column widescreen="12" mobile="16">
            {/* <Segment> */}
            <>
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
                  {/* <TextArea
                    onChange={this.handleChange}
                    name="body"
                    value={body}
                    required
                    rows={15}
                  /> */}
                  <RichTextEditor
                    value={this.state.body}
                    onChange={this.onChange}
                    toolbarConfig={toolbarConfig}
                    name="body"
                    required
                  />
                </Form.Field>
                <Button type="submit">Post</Button>
              </Form>
            </>
            {/* </Segment> */}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });

export default connect(mapStateToProps, { createPost, isLoggedIn })(NewPost);

// Optio quibusdam quos. Eum eaque sit quis consequatur. Explicabo recusandae cupiditate. Enim nisi rerum consequatur dolor. Porro quisquam cum maxime.

// Consequuntur aut dolorum. Velit culpa eum blanditiis esse. Aliquam consequatur doloremque et tempora. Quae et ut ea. Assumenda quam in omnis.

// Voluptatem eaque nulla ex hic quod sunt maiores nostrum consequatur. Itaque quo quam eum sequi labore voluptatibus. Voluptatem doloremque facilis nulla voluptas. Voluptatem quas sequi molestiae minima non nisi. Ut corrupti modi et quo similique qui cum non.

// Natus qui enim non optio aut qui voluptas. Ex dolor magni recusandae modi molestiae. Itaque eos quam.

// Est minus facilis voluptatum animi inventore iusto. Deserunt quam in magnam voluptatem omnis ipsum nulla corrupti. Consequuntur dolores cum natus consectetur.
