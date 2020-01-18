import React, { Component } from "react";
import {
  Container,
  Loader,
  Header,
  Comment,
  Divider,
  Form,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getPost, fetchComments, postComment } from "../actions";
import moment from "moment";
import faker from "faker";

import ReactHtmlParser from "react-html-parser";

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

  componentDidMount() {
    this.props.getPost(
      this.state.pathname,
      success =>
        this.props.fetchComments(
          { post: this.props.post._id },
          () => this.setState({ loading: false }),
          () => {}
        ),
      fail => {}
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.props.user) this.props.history.push("/login");
    const { comment, author } = this.state;

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

  renderComments = () => {
    return this.props.comments.map(comment => (
      <Comment key={comment._id}>
        <Comment.Avatar src={comment.author.avatar} />
        <Comment.Content>
          <Comment.Author as="span">{comment.author.name}</Comment.Author>
          <Comment.Metadata>
            <div>{moment(comment.createdAt).fromNow()}</div>
          </Comment.Metadata>
          <Comment.Text style={{ whiteSpace: "pre-line" }}>
            {comment.body}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    ));
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  removeNBSP = str => {
    // let string = ''.replace()
    return str.replace(/&nbsp;/g, " ");
  };

  render() {
    return this.state.loading ? (
      <Container>
        <Loader active>Loading</Loader>
      </Container>
    ) : this.props.post ? (
      <Container text>
        <Header as="h2" dividing>
          {this.props.post.title}
        </Header>
        <div>{`Created At: ${moment(this.props.post.createdAt).format(
          "MMM. Do, YYYY"
        )}`}</div>
        <div>Author: {this.props.post.author}</div>
        {/* http://127.0.0.1:3000/post/5e222c51c973d8649c956f64 */}

        <div
          style={{
            whiteSpace: "pre-line"
            // wordWrap: "break-word",
            // overflowWrap: "break-word"
            // wordBreak: "break-word"
          }}
        >
          {ReactHtmlParser(
            ReactHtmlParser(this.removeNBSP(this.props.post.body))
          )}
        </div>

        {/* <p style={{ whiteSpace: "pre-line" }}>Body: {this.props.post.body}</p> */}
        <Divider></Divider>
        <Comment.Group>
          <Header as="h3" dividing>
            {`${this.props.comments.length}`}{" "}
            {this.props.comments.length === 1 ? "Comment" : "Comments"}
          </Header>

          {this.props.comments ? (
            <>{this.renderComments()}</>
          ) : (
            <div>Be the first to comment!</div>
          )}
          <Form reply onSubmit={this.handleSubmit} style={{ marginBottom: 30 }}>
            <Form.TextArea
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
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
  getPost,
  fetchComments,
  postComment
})(Topic);
