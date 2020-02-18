import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {
  fetchThread,
  updateThread,
  createPost,
  updateMe,
  fetchPagedPosts
} from "../actions";
import { Post, Editor } from "../components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { capitalize } from "../utils/helperFunctions";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default ({ location, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const user = useSelector(state => state.user);
  const thread = useSelector(state => state.thread);
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const threadID = location.pathname.split("/")[2];
  let query = useQuery();
  const [page, setPage] = useState(query.get("page") || 1);

  function Page() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Pagination
            page={page * 1}
            count={Math.ceil(posts.totalCount / 10).toPrecision(1) * 1}
            siblingCount={0}
            renderItem={item => (
              <PaginationItem
                component={Link}
                to={`/thread/${threadID}${
                  item.page === 1 ? "" : `?page=${item.page}`
                }`}
                {...item}
                onClick={() => setPage(item.page)}
              />
            )}
          />
        </div>
        <Button color="primary" variant="contained" onClick={handleReply}>
          Reply to this thread
        </Button>
      </div>
    );
  }

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
            fetchPagedPosts({ thread: threadID, page }, success => {
              setLoading(false);
            })
          );
        },
        fail => history.push("/error")
      )
    );
    return () => {};
    // eslint-disable-next-line
  }, [page]);

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
            <Page />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">{thread.body}</Typography>
          </Grid>

          <Grid item xs={12}>
            {renderPosts(posts.totalData)}
          </Grid>

          <Grid item xs={12}>
            <Page />
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
              <Pagination
                count={10}
                renderItem={item => (
                  <PaginationItem
                    component={Link}
                    to={`/cars${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      )}
    </Container>
  );
};
