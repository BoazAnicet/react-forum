import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Divider,
  Grid,
  TextField,
  Button,
  makeStyles
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updatePassword } from "../actions";
import Settings from "../components/Settings";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  valid: {
    color: theme.palette.success.main
  },
  invalid: {
    color: theme.palette.error.main
  }
}));

const Password = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
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

    if (
      !newPassword.length >= 8 ||
      !newPassword.match(/[0-9]/) ||
      !newPassword.match(/[A-Z]/) ||
      newPassword.match(/\s/) ||
      newPassword !== confirmNewPassword
    ) {
      return setChanging(false);
    }

    // if (newPassword !== confirmNewPassword) {
    //   setChanging(false);
    //   return openSnack("New and confirm passwords do not match!", "error");
    // }

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
          <Typography
            className={
              newPassword.length >= 8 ? classes.valid : classes.invalid
            }
          >
            Must be a minimum of 8 characters
          </Typography>
          <Typography
            className={
              newPassword.match(/[0-9]/) ? classes.valid : classes.invalid
            }
          >
            Must have at least one number
          </Typography>
          <Typography
            className={
              newPassword.match(/[A-Z]/) ? classes.valid : classes.invalid
            }
          >
            Must contain at least one uppercase letter
          </Typography>
          <Typography
            className={
              !newPassword.match(/\s/) ? classes.valid : classes.invalid
            }
          >
            CANNOT have any spaces
          </Typography>
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
          <Typography
            className={
              newPassword === confirmNewPassword
                ? classes.valid
                : classes.invalid
            }
          >
            Matches new password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color={"primary"}
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
  return <Settings value={2} Panel={Password} />;
};
