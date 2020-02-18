import React from "react";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Settings from "../components/Settings";
import { deleteMe } from "../actions/userActions";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Delete = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(deleteMe(null));
  };

  return (
    <>
      <Typography variant="h5">Delete Account</Typography>
      <br />
      <Divider />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Delete
          </Button>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h4">Are you sure?</Typography>
          <br />
          <Divider />
          <br />
          <form onSubmit={handleSubmit}>
            <Button color="secondary" type="submit" variant="contained">
              Delete
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default () => {
  return <Settings value={3} Panel={Delete} />;
};
