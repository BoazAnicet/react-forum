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

class Topic extends Component {
  state = {
    loading: true,
    pathname: this.props.location.pathname.split("/")[2],
    comment: "",
    author: faker.name.findName()
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
    const { comment, author } = this.state;

    this.props.postComment({
      body: comment,
      post: this.props.post._id,
      author
    });

    this.setState({ comment: "", author: faker.name.findName() });
  };

  renderComments = () => {
    return this.props.comments.map(comment => (
      <Comment key={comment._id}>
        <Comment.Avatar src={comment.avatar} />
        <Comment.Content>
          <Comment.Author as="span">{comment.author}</Comment.Author>
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

  /// 5e18ed676179c69fb0ac97a9
  // http://127.0.0.1:3000/post/5e18ed676179c69fb0ac97a9
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
        <p style={{ whiteSpace: "pre-line" }}>Body: {this.props.post.body}</p>
        <Divider></Divider>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          {this.props.comments ? (
            <>{this.renderComments()}</>
          ) : (
            <div>Be the first to comment!</div>
          )}
          <Form reply onSubmit={this.handleSubmit}>
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

const mapStateToProps = ({ post, comments }) => ({ post, comments });

export default connect(mapStateToProps, {
  getPost,
  fetchComments,
  postComment
})(Topic);
