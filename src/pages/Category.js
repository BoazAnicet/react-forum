import React from "react";
import { Table, Container, Loader } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getManyPosts } from "../actions";

class Category extends React.Component {
  state = {
    category: this.props.match.url.split("/")[2].toLowerCase(),
    loading: true
  };

  componentDidMount() {
    this.props.getManyPosts({ category: this.state.category });
    this.setState({ loading: false });
  }

  renderPosts = () => {
    return this.props.posts.map(post => (
      <Table.Row key={post._id}>
        <Table.Cell>
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </span>
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

  render() {
    return this.state.loading ? (
      <Container>
        <Loader active>Loading</Loader>
      </Container>
    ) : this.props.posts ? (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Topics</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Replies/Views</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderPosts()}</Table.Body>
        </Table>
      </Container>
    ) : (
      <>{this.props.history.push("/")}</>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { getManyPosts })(Category);
