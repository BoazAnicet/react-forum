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
import { getPost } from "../actions";
import moment from "moment";

class Topic extends Component {
  state = {
    loading: true,
    pathname: this.props.location.pathname.split("/")[2]
  };

  componentDidMount() {
    this.props.getPost(
      this.state.pathname,
      () => {
        console.log("Got the post");
        this.setState({ loading: false });
      },
      () => console.log("Didn't get the post")
    );
  }

  renderComments = () => {
    return this.props.comments.map(comment => (
      <Comment key={comment.id}>
        <Comment.Avatar src={comment.avatar} />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>{moment(comment.createdAt).fromNow()}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
        </Comment.Content>
      </Comment>
    ));
  };

  /// 5e18ed676179c69fb0ac97a9
  // http://127.0.0.1:3000/post/5e18ed676179c69fb0ac97a9
  render() {
    return !this.state.loading ? (
      this.props.post ? (
        <Container>
          <Header as="h2" dividing>
            {this.props.post.title}
          </Header>
          <div>{`Created At: ${moment(this.props.post.createdAt).format(
            "MMM. Do, YYYY"
          )}`}</div>
          <div>Author: {this.props.post.author}</div>
          <div>Body: {this.props.post.body}</div>
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
            <Form reply>
              <Form.TextArea />
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
            {/* <Comment>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    This has been very useful for my research. Thanks as well!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      Elliot you are always so right :)
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment> */}
          </Comment.Group>
        </Container>
      ) : (
        <>{this.props.history.push("/")}</>
      )
    ) : (
      <Container>
        <Loader active>Loading</Loader>
      </Container>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });

export default connect(mapStateToProps, { getPost })(Topic);
