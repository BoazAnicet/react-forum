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
  state = {
    loading: true
  };
  componentDidMount() {
    this.props.getManyPosts(
      { limit: 10 },
      () => {},
      () => {}
    );
  }

  renderCategories = () => {
    return categories.map(c => (
      <Table.Row key={c}>
        <Table.Cell>
          <Link to={`/forum/${c}`}>{c}</Link>
        </Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Topics</Table.HeaderCell>
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
