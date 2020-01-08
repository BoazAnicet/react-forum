import React, { Component } from "react";
import Post from "../components/Post";
import posts from "../test-data/posts.json";
import { SidePanel } from "../components/";

import { Col, Row } from "styled-bootstrap-grid";
import { connect } from "react-redux";
import { getAllPosts } from "../actions";
// const { title, body, comments, views, createdAt } = posts[0];
// const { avatar } = posts[0].author;
import moment from "moment";

import { Container, Table, TableCell } from "semantic-ui-react";

const createSnippet = str =>
  str
    .split(" ")
    .slice(0, 18)
    .join(" ") + "...";

// const createSnippet = str => {
//   let snippet = "";

//   snippet =
//     str
//       .split(" ")
//       .slice(0, 18)
//       .join(" ") + "...";

//   return snippet;
// };

///// http://127.0.0.1:3000/profile

// const renderPosts = posts => {
//   return posts.map(post => (
//     <Post
//       key={post.title}
//       title={post.title}
//       body={createSnippet(post.body)}
//       avatar={post.author.avatar}
//       commentCount={post.comments.length}
//       views={post.views}
//       date={post.createdAt}
//     />
//   ));
// };

const renderPosts = () => {
  return posts.map(post => (
    <Table.Row key={post.title}>
      {/* <TableCell.Cell>
        <p>{post.title}</p>
        <p>{post.createdAt}</p>
      </TableCell.Cell>
      <TableCell.Cell>
        <p>{post.comments.length}</p>
        <p>{post.views}</p>
      </TableCell.Cell>
      <TableCell.Cell>
        <p>{post.title}</p>
        <p>{post.createdAt}</p>
      </TableCell.Cell> */}
      <Table.Cell>
        <span>{post.title}</span>
        <br />
        <span style={{ color: "#999" }}>
          {moment(post.createdAt).format("MMM Do, YYYY")}
        </span>
      </Table.Cell>
      <Table.Cell>
        <p>{`${post.author.firstName} ${post.author.lastName}`} </p>
      </Table.Cell>
      <Table.Cell>
        <span>{post.comments.length}</span>
        <br />
        <span>{post.views}</span>
      </Table.Cell>
    </Table.Row>
  ));
};
class Home extends Component {
  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.getAllPosts();
    }
  }

  render() {
    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Topic</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Replies/Views</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{renderPosts(posts)}</Table.Body>
        </Table>

        {/* <Post
        title={title}
        body={createSnippet(body)}
        avatar={avatar}
        commentCount={comments.length}
        views={views}
        date={createdAt}
      /> */}
        <Row>
          {/* <Col lg="8">{renderPosts(posts)}</Col> */}
          {/* <Col lg="4">
            <SidePanel />
          </Col> */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { getAllPosts })(Home);
