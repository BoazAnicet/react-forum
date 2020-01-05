import React, { Component } from "react";
import { Container } from "styled-bootstrap-grid";
import { connect } from "react-redux";
import { getPost } from "../actions";
import moment from "moment";

class Topic extends Component {
  componentDidMount() {
    this.props.getPost(this.props.location.state.id);
  }

  render() {
    // const { createdAt, author, title, body } = this.props.post;
    return !this.props.post ? (
      <div>Loading</div>
    ) : (
      <Container>
        Topic Page
        <div>
          Created At:{" "}
          {moment(this.props.post.createdAt).format("MMM. Do, YYYY")}
        </div>
        <div>Author: {this.props.post.author}</div>
      </Container>
    );
  }
}

const mapStateToProps = ({ post }) => ({
  post
});

export default connect(mapStateToProps, { getPost })(Topic);
