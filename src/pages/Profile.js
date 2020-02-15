import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  Avatar,
  Paper,
  makeStyles
} from "@material-ui/core";
import { fetchProfile } from "../actions";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: { padding: 20 },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  }
}));

export default props => {
  const classes = useStyles();
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [fetching, setFetching] = useState(true);
  const profileID = history.location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(
      fetchProfile(
        profileID,
        success => setFetching(false),
        fail => history.push("/error")
      )
    );

    return () => {};
    // eslint-disable-next-line
  }, []);

  return fetching ? (
    <Container maxWidth={"md"}>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <CircularProgress>Loading</CircularProgress>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar className={classes.large} src={`${profile.photo}`} />
          </Grid>

          <Grid item xs={8} container>
            <Grid item xs={12}>
              <Typography variant={"h4"}>{profile.username}</Typography>
              <Typography variant="subtitle2">Member</Typography>
            </Grid>
            <Grid container spacing={3} item xs={12}>
              <Grid item>
                <InputLabel>Posts</InputLabel>
                <Typography>{profile.postCount}</Typography>
              </Grid>
              <Grid item>
                <InputLabel>Joined</InputLabel>
                <Typography>
                  {moment(profile.joinDate).format("MMMM Do, YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
