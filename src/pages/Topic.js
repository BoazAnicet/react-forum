import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../actions";
import moment from "moment";
import faker from "faker";

import ReactHtmlParser from "react-html-parser";
import {
  Typography,
  Divider,
  Button,
  Container,
  CircularProgress,
  TextField
} from "@material-ui/core";

import { Post } from "../components";

class Topic extends Component {
  state = {
    loading: true,
    pathname: this.props.location.pathname.split("/")[2],
    comment: "",
    author: {
      name: faker.name.findName(),
      avatar: faker.image.avatar()
    }
  };

  // componentDidMount() {
  //   this.props.getPost(
  //     this.state.pathname,
  //     success =>
  //       this.props.fetchComments(
  //         { post: this.props.post._id },
  //         () => this.setState({ loading: false }),
  //         () => {}
  //       ),
  //     fail => {}
  //   );
  // }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.props.user) this.props.history.push("/login");
    const { comment } = this.state;

    this.props.postComment({
      author: {
        name: faker.name.findName(),
        avatar: faker.image.avatar()
      },
      body: comment,
      createdAt: Date.now(),
      post: this.props.post._id
    });

    this.setState({ comment: "", author: {} });
  };

  renderPosts = () => {
    return this.props.comments.map(p => (
      <>
        <Post key={p._id} author={p.author} body={p.body} post={p} />
        <Divider />
      </>
    ));
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleComment = e => this.setState({ comment: e.target.value });

  removeNBSP = str => {
    // let string = ''.replace()
    return str.replace(/&nbsp;/g, " ");
  };

  render() {
    return this.state.loading ? (
      <Container>
        <CircularProgress />
      </Container>
    ) : this.props.post ? (
      <Container maxWidth="lg">
        <Typography variant="h4">{this.props.post.title}</Typography>
        <Typography>
          {`${this.props.post.author} | ${moment(
            this.props.post.createdAt
          ).format("MMM. Do, YYYY")}`}{" "}
        </Typography>
        {/* http://127.0.0.1:3000/post/5e222c51c973d8649c956f64 */}

        <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
          {ReactHtmlParser(
            ReactHtmlParser(this.removeNBSP(this.props.post.body))
          )}
        </Typography>

        <Divider></Divider>

        <Typography variant="h6">
          {`${this.props.comments.length}`}{" "}
          {this.props.comments.length === 1 ? "Comment" : "Comments"}
        </Typography>
        {/* <Divider></Divider> */}

        {this.props.comments ? (
          <>{this.renderPosts()}</>
        ) : (
          // <>{this.renderComments()}</>
          <div>Be the first to comment!</div>
        )}
        <form onSubmit={this.handleSubmit} style={{ marginBottom: 30 }}>
          <TextField
            label="comment"
            multiline
            rows="4"
            defaultValue="Default Value"
            variant="filled"
            value={this.state.comment}
            onChange={this.handleComment}
          />
          <Button color="primary" variant="contained" type="submit">
            Add Reply
          </Button>
        </form>
      </Container>
    ) : (
      <>{this.props.history.push("/")}</>
    );
  }
}

const mapStateToProps = ({ post, comments, user }) => ({
  post,
  comments,
  user
});

export default connect(mapStateToProps, {
  getPost
})(Topic);
