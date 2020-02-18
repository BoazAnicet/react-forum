import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Settings from "../components/Settings";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { updateEmail } from "../actions/userActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Email = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Message!");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [changing, setChanging] = useState(false);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const openSnack = (message, severity) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setChanging(true);

    dispatch(
      updateEmail(
        { email: newEmail, passwordCurrent: password },
        success => {
          openSnack("Email changed!", "success");
          setEmail(newEmail);
          setNewEmail("");
          setPassword("");
          setChanging(false);
        },
        fail => {
          openSnack("Error updating email!", "error");
          setChanging(false);
        }
      )
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Change email address</Typography>
      <br />
      <Divider />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Current email address</Typography>
          <Typography>{email}</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            variant={"outlined"}
            label="New email address"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            size="small"
            fullWidth
            required
          />
          <Typography variant={"caption"}>
            Supply a new email address to associate with your account
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            variant={"outlined"}
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            size="small"
            required
            fullWidth
          />
          <Typography variant={"caption"}>
            To ensure this change is secure
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={changing}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default () => {
  return <Settings value={1} Panel={Email} />;
};
