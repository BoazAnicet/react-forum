import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signUp } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
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
  valid: {
    color: theme.palette.success.main
  },
  invalid: {
    color: theme.palette.error.main
  }
}));

export default props => {
  const user = useSelector(state => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!username.length >= 3 && !username.length <= 12) return;
    if (!username.match(/^[a-zA-Z0-9_.]*$/)) return;
    if (
      !password.length >= 8 ||
      !password.match(/[0-9]/) ||
      !password.match(/[A-Z]/) ||
      password.match(/\s/) ||
      password !== passwordConfirm
    )
      return;

    dispatch(
      signUp(
        {
          username,
          email,
          password,
          passwordConfirm,
          joinDate: Date.now()
        },
        success => history.push(`/`)
      )
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
              <Typography
                className={
                  username.match(/^[a-zA-Z0-9_.]*$/)
                    ? classes.valid
                    : classes.invalid
                }
                maxLength="12"
              >
                Contains only numbers and letters
              </Typography>
              <Typography
                className={
                  username.length >= 3 && username.length <= 12
                    ? classes.valid
                    : classes.invalid
                }
              >
                Between 3-12 characters
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="Fake emails are fine"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Typography
                className={
                  password.length >= 8 ? classes.valid : classes.invalid
                }
              >
                Must be a minimum of 8 characters
              </Typography>
              <Typography
                className={
                  password.match(/[0-9]/) ? classes.valid : classes.invalid
                }
              >
                Must have at least one number
              </Typography>
              <Typography
                className={
                  password.match(/[A-Z]/) ? classes.valid : classes.invalid
                }
              >
                Must contain at least one uppercase letter
              </Typography>
              <Typography
                className={
                  !password.match(/\s/) ? classes.valid : classes.invalid
                }
              >
                CANNOT have any spaces
              </Typography>
            </Grid>
            {/*  */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
              />
              <Typography
                className={
                  password === passwordConfirm ? classes.valid : classes.invalid
                }
              >
                Matches password
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
};
