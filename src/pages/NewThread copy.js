import React, { Component } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { createThread } from "../actions";
import { createPost } from "../actions/postActions";
import { isLoggedIn } from "../actions";
import reactRTE from "react-rte";
import { RichTextEditor } from "../components";

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

  state = {
    title: "",
    body: reactRTE.createEmptyValue(),
    category: "",
    creatingThread: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    if (this.props.user) {
      const { title, category } = this.state;
      let body = this.state.body.toString("html");
      let author = this.props.user;

      // 1. Create new thread with title, author, date and category
      // 2. Create new post in thread with author, date, category and body

      this.props.createThread(
        { author, title, category, created: Date.now() },
        success =>
          this.props.createPost(
            {
              author,
              body,
              thread: this.props.thread._id,
              created: Date.now()
            },
            success =>
              this.props.history.push(`/thread/${this.props.thread._id}`),
            fail => console.log("Error creating post.")
          ),
        fail => {}
      );
    }
  };

  onChange = body => this.setState({ body });

  render() {
    const { title, body } = this.state;
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="title"
                  label="Title"
                  onChange={e => this.setState({ title: e.target.value })}
                  value={title}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  fullWidth
                  name="category"
                  value={this.state.category}
                  onChange={e => this.setState({ category: e.target.value })}
                  required
                >
                  {categories.map(c => (
                    <MenuItem key={c.key} value={c.value}>
                      {c.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <RichTextEditor
                name="body"
                value={body}
                onChange={this.onChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, thread, post }) => ({ user, thread, post });

export default connect(mapStateToProps, {
  createPost,
  isLoggedIn,
  createThread
})(NewPost);
