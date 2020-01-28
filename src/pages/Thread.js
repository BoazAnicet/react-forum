import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Breadcrumbs,
  Link
} from "@material-ui/core";
import { getThread, getManyPosts } from "../actions";
import { createPost } from "../actions/postActions";
import { RichTextEditor, Post } from "../components";
import reactRTE from "react-rte";
import { capitalize } from "../utils/helperFunctions";
// import {Link} from 'react-router-dom'

function Thread({
  getThread,
  getManyPosts,
  history,
  createPost,
  // thread,
  ...props
}) {
  const [body, setBody] = useState(reactRTE.createEmptyValue());
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const user = useSelector(state => state.user);
  const thread = useSelector(state => state.thread);
  const posts = useSelector(state => state.posts);
  const threadID = props.location.pathname.split("/")[2];

  useEffect(() => {
    getThread(
      threadID,
      success =>
        getManyPosts(
          { thread: threadID },
          success => setLoading(false),
          fail => {}
        ),
      fail => history.push("/error")
    );
    return () => {};
  }, []);

  const renderPosts = posts => posts.map(p => <Post key={p._id} post={p} />);

  const onChange = body => setBody(body);

  const handleSubmit = e => {
    e.preventDefault();

    if (user) {
      createPost(
        {
          author: user,
          body: body.toString("html"),
          thread: thread._id,
          created: Date.now()
        },
        success => console.log("created post"),
        fail => console.log("Error creating post.")
      );

      setBody(reactRTE.createEmptyValue());
    } else {
      history.push("/login");
    }
  };

  // http://127.0.0.1:3000/thread/5e2fc0fb8f15d95c24e0e166

  return (
    <Container maxWidth={"md"}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/forum">
                Home
              </Link>
              <Link color="inherit" href={`/forum/${thread.category}`}>
                {capitalize(thread.category)}
              </Link>
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
            {/* {renderPosts(props.posts)} */}
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
                    <RichTextEditor
                      name="body"
                      value={body}
                      onChange={onChange}
                    />
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
                          setBody(reactRTE.createEmptyValue());
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
}

const mapStateToProps = ({}) => ({});
// const mapStateToProps = ({ thread, posts, user }) => ({ thread, posts, user });

export default connect(mapStateToProps, {
  getThread,
  getManyPosts,
  createPost
})(Thread);
