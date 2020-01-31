import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  makeStyles,
  List,
  ListItem,
  Typography
} from "@material-ui/core";

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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const Home = props => {
  const classes = useStyles();

  const renderCategories = () => {
    return categories.map(c => (
      <ListItem key={c}>
        <Link to={`/forum/${c}`}>
          <Typography>{c}</Typography>
        </Link>
      </ListItem>
    ));
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <List component="nav">{renderCategories()}</List>
      </div>
    </Container>
  );
};

export default Home;
