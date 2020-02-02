import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  CircularProgress,
  Grid,
  Typography,
  InputLabel
} from "@material-ui/core";

export default props => {
  const user = useSelector(state => state.user);

  return user ? (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <InputLabel>First Name</InputLabel>
          <Typography>{user.firstName || "firstName"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Last Name</InputLabel>
          <Typography>{user.lastName || "lastName"}</Typography>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Container maxWidth={"md"}>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <CircularProgress>Loading</CircularProgress>
        </Grid>
      </Grid>
    </Container>
  );
};
