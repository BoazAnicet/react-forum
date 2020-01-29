import React, { useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button
  // makeStyles
} from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { createThread } from "../actions";
import { createPost } from "../actions/postActions";
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

// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   }
// }));

const NewPost = ({ ...props }) => {
  // const classes = useStyles();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(reactRTE.createEmptyValue());
  const [category, setCategory] = useState("");
  const user = useSelector(state => state.user);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (user) {
      let author = user;
      let content = body.toString("html");

      // 1. Create new thread with title, author, date and category
      props.createThread(
        { author, title, category, created: Date.now() },
        success => {
          let id = success;
          // 2. Create new post in thread with author, date, category and body
          props.createPost(
            {
              author,
              body: content,
              thread: id,
              created: Date.now()
            },
            success => props.history.push(`/thread/${id}`),
            fail => {}
          );
        },
        fail => {}
      );
    }
  };

  const onChange = body => setBody(body);

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                name="title"
                label="Title"
                onChange={e => setTitle(e.target.value)}
                value={title}
                variant="outlined"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel ref={inputLabel}>Category</InputLabel>
              <Select
                name="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
                labelWidth={labelWidth}
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

export default connect(null, {
  createPost,
  createThread
})(NewPost);
