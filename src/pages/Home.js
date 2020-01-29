import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Container, CircularProgress } from "@material-ui/core";

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

const Home = props => {
  const [loading, setLoading] = useState(true);

  // LISTS

  useEffect(() => {
    setLoading(false);
  }, []);

  const renderCategories = () => {
    return categories.map(c => (
      <Table.Row key={c}>
        <Table.Cell>
          <Link to={`/forum/${c}`}>{c}</Link>
        </Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <Container maxWidth="md">
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Topics</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{renderCategories()}</Table.Body>
        </Table>
      )}
    </Container>
  );
};

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { fetchPosts })(Home);
