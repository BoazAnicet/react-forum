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

const useStyles = makeStyles(theme => ({
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",

  // },
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
            <Grid item xs={12} sm={6}>
              <Typography variant={"h4"}>{profile.username}</Typography>
              <Typography variant="caption">Member</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Last Name</InputLabel>
              <Typography>{profile.lastName || "lastName"}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Container,
//   CircularProgress,
//   Grid,
//   Typography,
//   InputLabel,
//   Avatar
// } from "@material-ui/core";
// import { fetchProfile } from "../actions";
// import { useHistory } from "react-router-dom";

// export default props => {
//   const profile = useSelector(state => state.profile);
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [fetching, setFetching] = useState(true);
//   const profileID = history.location.pathname.split("/")[2];

//   useEffect(() => {
//     dispatch(
//       fetchProfile(
//         profileID,
//         success => setFetching(false),
//         fail => history.push("/error")
//       )
//     );

//     return () => {};
//     // eslint-disable-next-line
//   }, []);

//   return fetching ? (
//     <Container maxWidth={"md"}>
//       <Grid container alignItems="center" justify="center">
//         <Grid item>
//           <CircularProgress>Loading</CircularProgress>
//         </Grid>
//       </Grid>
//     </Container>
//   ) : (
//     <Container maxWidth="md">
//       <Grid container>
//         <Grid item xs={12} sm={6}>
//           <InputLabel>First Name</InputLabel>
//           <Typography>{profile.firstName || "firstName"}</Typography>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <InputLabel>Last Name</InputLabel>
//           <Typography>{profile.lastName || "lastName"}</Typography>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
