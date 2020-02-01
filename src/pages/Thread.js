import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Breadcrumbs
} from "@material-ui/core";
import { fetchThread } from "../actions";
import { createPost, fetchPosts } from "../actions/postActions";
import { Post, Editor } from "../components";
import { Link, useHistory } from "react-router-dom";
import { capitalize } from "../utils/helperFunctions";

export default ({ location, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const user = useSelector(state => state.user);
  const thread = useSelector(state => state.thread);
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const threadID = location.pathname.split("/")[2];

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ]);

  useEffect(() => {
    dispatch(
      fetchThread(
        threadID,
        success =>
          dispatch(
            fetchPosts(
              { thread: threadID },
              success => setLoading(false),
              fail => {}
            )
          ),
        fail => history.push("/error")
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPosts = posts => posts.map(p => <Post key={p._id} post={p} />);

  const handleSubmit = e => {
    e.preventDefault();

    if (user) {
      dispatch(
        createPost(
          {
            author: user,
            body: value,
            thread: thread._id,
            created: Date.now()
          },
          success => {
            setReplying(false);
            setValue([
              {
                type: "paragraph",
                children: [{ text: "" }]
              }
            ]);
          },
          fail => {}
        )
      );
    } else {
      history.push("/login");
    }
  };

  return (
    <Container maxWidth={"md"}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/">
                Home
              </Link>
              {/* <Link color="inherit" to={`/forums/${thread.category}`}>
                {capitalize(thread.category)}
              </Link> */}
              <Typography color="textPrimary">
                {capitalize(thread.category)}
              </Typography>
              <Typography color="textPrimary">
                {capitalize(thread.title)}
              </Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3">{thread.title}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">{thread.body}</Typography>
          </Grid>

          <Grid item xs={12}>
            {renderPosts(posts)}
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setReplying(true)}
            >
              Reply to this thread
            </Button>
          </Grid>

          {replying ? (
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Editor value={value} onChange={value => setValue(value)} />
                  </Grid>

                  <Grid container item xs={12} spacing={1}>
                    <Grid item>
                      <Button type="submit" color="primary" variant="contained">
                        Reply
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => {
                          setValue([
                            {
                              type: "paragraph",
                              children: [{ text: "" }]
                            }
                          ]);
                          setReplying(false);
                        }}
                        color="primary"
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      )}
    </Container>
  );
};
