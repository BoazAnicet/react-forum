import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updatePassword } from "../actions";
import Settings from "../components/Settings";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Password = () => {
  const dispatch = useDispatch();
  const [passwordCurrent, setPasswordCurrent] = useState("hello1234");
  const [newPassword, setNewPassword] = useState("hello1234");
  const [confirmNewPassword, setConfirmNewPassword] = useState("hello1234");

  const [message, setMessage] = useState("Message!");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  const [changing, setChanging] = useState(false);

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
    if (newPassword !== confirmNewPassword) {
      return openSnack("New and confirm passwords do not match!", "error");
    }

    dispatch(
      updatePassword(
        {
          passwordCurrent,
          password: newPassword,
          passwordConfirm: confirmNewPassword
        },
        success => {
          openSnack("Password changed!", "success");
          setConfirmNewPassword("");
          setPasswordCurrent("");
          setNewPassword("");
          setChanging(false);
        },
        fail => {
          openSnack("Error changing password!", "error");
          setChanging(false);
        }
      )
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Change password</Typography>
      <br />
      <Divider />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <TextField
            type="password"
            variant={"outlined"}
            label="Current Password"
            value={passwordCurrent}
            onChange={e => setPasswordCurrent(e.target.value)}
            size="small"
            fullWidth
            required
            name="password"
            id="password"
          />
          <Typography variant={"caption"}>
            To ensure this change is secure
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            variant="outlined"
            label="New Password"
            size="small"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            variant="outlined"
            label="Confirm New Password"
            size="small"
            type="password"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color={"primary"}
            type="submit"
            disabled={changing}
          >
            {/* <Button variant="contained" color="primary" type="submit"> */}
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
  return <Settings value={2} Panel={Password} />;
};
