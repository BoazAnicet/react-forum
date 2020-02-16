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
import {
  fetchThread,
  updateThread,
  createPost,
  fetchPosts,
  updateMe
} from "../actions";
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

  const handleReply = () => {
    if (user) {
      setReplying(true);
    } else {
      history.push("/login");
    }
  };

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
        success => {
          dispatch(
            fetchPosts({ thread: threadID }, success => {
              setLoading(false);
            })
          );
        },
        fail => history.push("/error")
      )
    );
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(updateThread({ id: threadID, body: { views: thread.views + 1 } }));
    return () => {};
    // eslint-disable-next-line
  }, [thread]);

  const renderPosts = posts => posts.map(p => <Post key={p._id} post={p} />);

  const handleSubmit = e => {
    e.preventDefault();

    if (user) {
      let author = {
        joinDate: user.joinDate,
        username: user.username,
        photo: user.photo,
        postCount: user.postCount,
        _id: user._id
      };
      dispatch(
        createPost(
          {
            author,
            body: value,
            thread: thread._id,
            created: Date.now()
          },
          success => {
            dispatch(updateMe({ postCount: user.postCount + 1 }));
            dispatch(
              updateThread({
                id: threadID,
                body: {
                  replies: thread.replies + 1,
                  lastPost: {
                    author: { username: user.username, _id: user._id },
                    date: Date.now()
                  }
                }
              })
            );
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
            <Button color="secondary" variant="contained" onClick={handleReply}>
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
