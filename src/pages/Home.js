import React, { Component } from "react";
import { connect } from "react-redux";
import { getManyPosts } from "../actions";
import { Container, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

///// http://127.0.0.1:3000/profile

const categories = [
  "Technology",
  "Finance",
  "Travel",
  "Health",
  "Design",
  "Entertainment",
  "Politics",
  "Style",
  "Culture"
];

class Home extends Component {
  renderCategories = () => {
    return categories.map(c => (
      <Table.Row key={c}>
        <Table.Cell>
          <Link to={`/forum/${c}`}>{c}</Link>
        </Table.Cell>
      </Table.Row>
    ));
  };

  // renderPosts = () => {
  //   return posts.map(post => (
  //     <Table.Row key={post.title}>
  //       <Table.Cell>
  //         <span
  //           style={{
  //             whiteSpace: "nowrap",
  //             overflow: "hidden",
  //             textOverflow: "ellipsis"
  //           }}
  //         >
  //           <Link
  //             to={{
  //               pathname: `/post/1`,
  //               state: { id: "5e04326e00f80c2d1c24579a" }
  //             }}
  //           >
  //             {post.title}
  //           </Link>
  //         </span>
  //         <br />
  //         <span style={{ color: "#999" }}>
  //           {moment(post.createdAt).format("MMM Do, YYYY")}
  //         </span>
  //       </Table.Cell>
  //       <Table.Cell>
  //         <p>{`${post.author.firstName} ${post.author.lastName}`} </p>
  //       </Table.Cell>
  //       <Table.Cell>
  //         <span>{post.comments.length}</span>
  //         <br />
  //         <span>{post.views}</span>
  //       </Table.Cell>
  //     </Table.Row>
  //   ));
  // };

  render() {
    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Topics</Table.HeaderCell>
              {/* <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Replies/Views</Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderCategories()}</Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { getManyPosts })(Home);
