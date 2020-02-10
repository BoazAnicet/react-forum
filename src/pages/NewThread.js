import React, { useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button,
  Typography
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateMe, createPost, createThread } from "../actions";
import Editor from "../components/Editor";

const categories = [
  { key: "general", text: "General", value: "general" },
  { key: "html", text: "HTML", value: "html" },
  { key: "css", text: "CSS", value: "css" },
  { key: "javascript", text: "JavaScript", value: "javascript" }
];

export default ({ ...props }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ]);

  let postLength = value.reduce((acc, val, index) => {
    // need to clear spaces to get better count?
    let n = 0;
    for (let i = 0; i < val.children.length; i++) {
      n += val.children[i].text.length;
    }

    return acc + n;
  }, 0);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [errors, setErrors] = useState({
    titleLength: "",
    postLength: "",
    category: ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (user) {
      if (postLength < 10) {
        return setErrors({
          ...errors,
          postLength: "The body must be at least 10 characters"
        });
      } else if (title.length < 10) {
        return setErrors({
          ...errors,
          titleLength: "The title must be at least 10 characters"
        });
      } else {
        let author = {
          joinDate: user.joinDate,
          firstName: user.firstName,
          photo: user.photo,
          postCount: user.postCount,
          _id: user._id
        };

        dispatch(
          createThread(
            {
              author,
              title,
              category,
              created: Date.now(),
              lastPost: {
                author: { _id: user._id, username: user.username },
                date: Date.now()
              }
            },
            success => {
              let id = success;
              dispatch(
                createPost(
                  {
                    author,
                    body: value,
                    thread: id,
                    created: Date.now()
                  },
                  success =>
                    dispatch(
                      updateMe({ postCount: user.postCount + 1 }, success =>
                        props.history.push(`/thread/${id}`)
                      )
                    )
                )
              );
            }
          )
        );
      }
    }
  };

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
              <Typography>{errors.titleLength}</Typography>
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
            <Editor value={value} onChange={value => setValue(value)} />
            <Typography>{errors.postLength}</Typography>
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
