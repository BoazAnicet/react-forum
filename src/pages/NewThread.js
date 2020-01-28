import React, { useEffect, useState } from "react";
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
import { connect, useDispatch, useSelector } from "react-redux";
import { createThread } from "../actions";
import { createPost } from "../actions/postActions";
import { isLoggedIn } from "../actions";
import reactRTE from "react-rte";
import { RichTextEditor } from "../components";
// import { useDispatch, useSelector } from "react-redux";

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

const NewPost = ({ ...props }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(reactRTE.createEmptyValue());
  const [category, setCategory] = useState("");
  // const [creatingThread, setCreatingThread] = useState(false);

  useEffect(() => {
    props.isLoggedIn(
      success => {},
      fail => props.history.push("/login")
    );
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (props.user) {
      let author = props.user;
      let content = body.toString("html");

      // 1. Create new thread with title, author, date and category
      // 2. Create new post in thread with author, date, category and body

      props.createThread(
        { author, title, category, created: Date.now() },
        success => {
          let id = success;
          props.createPost(
            {
              author,
              body: content,
              thread: id,
              created: Date.now()
            },
            success => props.history.push(`/thread/${id}`),
            fail => console.log("Error creating post.")
          );
        },
        fail => {}
      );
    }
  };

  const onChange = body => setBody(body);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                name="title"
                label="Title"
                onChange={e => setTitle(e.target.value)}
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
                value={category}
                onChange={e => setCategory(e.target.value)}
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
            <RichTextEditor name="body" value={body} onChange={onChange} />
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
};

const mapStateToProps = ({ user, thread, post }) => ({ user, thread, post });

export default connect(mapStateToProps, {
  createPost,
  isLoggedIn,
  createThread
})(NewPost);
