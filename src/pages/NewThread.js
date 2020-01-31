import React, { useState, useMemo } from "react";
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
  // makeStyles
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createThread } from "../actions";
import { createPost } from "../actions/postActions";

import Editor from "../components/Testing";
import { withReact } from "slate-react";
import { createEditor } from "slate";

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

// let body = [
//   {
//     type: "paragraph",
//     children: [
//       {
//         text: "12345"
//       },
//       {
//         text: "12345",
//         italic: true
//       }
//     ]
//   },
//   {
//     type: "paragraph",
//     children: [
//       {
//         text: "12345"
//       },
//       {
//         text: "12345",
//         bold: true
//       },
//       {
//         text: "12345",
//         bold: true,
//         underline: true,
//         italic: true
//       }
//     ]
//   }
// ];

// let bodyLength = body.reduce((acc, val, index) => {
//   console.log(val.children);
//   let n = 0;
//   for (let i = 0; i < val.children.length; i++) {
//     n += val.children[i].text.length;
//   }

//   return acc + n;
// }, 0);

// const count = value.text.count

const NewPost = ({ ...props }) => {
  // const classes = useStyles();
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
    // need to clear spaces to get better count
    let n = 0;
    for (let i = 0; i < val.children.length; i++) {
      n += val.children[i].text.length;
    }

    return acc + n;
  }, 0);

  const editor = useMemo(() => withReact(createEditor()), []);

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
        let author = user;

        // 1. Create new thread with title, author, date and category
        dispatch(
          createThread(
            { author, title, category, created: Date.now() },
            success => {
              let id = success;
              // 2. Create new post in thread with author, date, category and body
              dispatch(
                createPost(
                  {
                    author,
                    body: value,
                    thread: id,
                    created: Date.now()
                  },
                  success => props.history.push(`/thread/${id}`),
                  fail => {}
                )
              );
            },
            fail => {}
          )
        );
      }

      // if (postLength >= 10) {

      // let author = user;
      // let content = body.toString("html");

      // // 1. Create new thread with title, author, date and category
      // dispatch(
      //   createThread(
      //     { author, title, category, created: Date.now() },
      //     success => {
      //       let id = success;
      //       // 2. Create new post in thread with author, date, category and body
      //       dispatch(
      //         createPost(
      //           {
      //             author,
      //             body: value,
      //             thread: id,
      //             created: Date.now()
      //           },
      //           success => props.history.push(`/thread/${id}`),
      //           fail => {}
      //         )
      //       );
      //     },
      //     fail => {}
      //   )
      // );

      // } else {
      //   setErrors({ ...errors, postLength: "10 characters" });
      // }
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

export default NewPost;
