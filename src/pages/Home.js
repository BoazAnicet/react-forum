import React from "react";
import Post from "../components/Post";
import posts from "../test-data/posts.json";
import { SidePanel } from "../components/";

import { Col, Row, Container } from "styled-bootstrap-grid";
// const { title, body, comments, views, createdAt } = posts[0];
// const { avatar } = posts[0].author;

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

const renderPosts = posts => {
  return posts.map(post => (
    <Post
      key={post.title}
      title={post.title}
      body={createSnippet(post.body)}
      avatar={post.author.avatar}
      commentCount={post.comments.length}
      views={post.views}
      date={post.createdAt}
    />
  ));
};

export default function Home() {
  return (
    <>
      <Container>
        {/* <Post
        title={title}
        body={createSnippet(body)}
        avatar={avatar}
        commentCount={comments.length}
        views={views}
        date={createdAt}
      /> */}
        <Row>
          <Col lg="8">{renderPosts(posts)}</Col>
          <Col lg="4">
            <SidePanel />
          </Col>
        </Row>
      </Container>
    </>
  );
}
