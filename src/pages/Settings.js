import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Divider, Grid, TextField, Container, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
    // height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  divider: { width: "100%" }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event, newValue) => {
    event.stopPropagation();
    if (typeof newValue === "string") {
      return;
    }
    console.log(newValue);
    // setPassword("");
    // setNewEmail("");

    setValue(newValue);
  };

  const Overview = () => {
    return (
      <>
        <br />
        <Typography variant={"h6"}>Display Name</Typography>
        <Typography>{user.username}</Typography>
        <br />
        <Divider className={classes.divider} />
        <br />
        <Typography variant={"h6"}>Email Address</Typography>
        <Typography>{user.email}</Typography>
        <br />
        <Divider className={classes.divider} />
        <br />
        <Typography variant={"h6"}>Password</Typography>
        <Typography>********</Typography>
        <br />
      </>
    );
  };

  const Email = () => {
    return (
      <form onChange={(e, value) => e.stopPropagation()}>
        <Typography variant="h5">Change email address</Typography>
        <br />
        <Divider />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Current email address</Typography>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              variant={"outlined"}
              label="New email address"
              value={newEmail}
              onChange={(e, value) => {
                e.stopPropagation();
                setNewEmail(value);
              }}
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
              onChange={(e, value) => {
                e.stopPropagation();
                setPassword(value);
              }}
              size="small"
              required
              fullWidth
            />
            <Typography variant={"caption"}>
              To ensure this change is secure
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  const Password = () => {
    return (
      <form onChange={e => e.stopPropagation()}>
        <Typography variant="h5">Change password</Typography>
        <br />
        <Divider />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <TextField
              variant={"outlined"}
              label="Current Password"
              size="small"
              type="password"
              value={password}
              onChange={(e, value) => {
                e.stopPropagation();
                setPassword(value);
              }}
              fullWidth
              required
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
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Tabs
          // orientation="horizontal"
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={(e, value) => {
            e.stopPropagation();
            if (typeof value === "string") {
              return;
            }
            setValue(value);

            // handleChange(e, value);
          }}
          // onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {/* <Tab label="Overview" {...a11yProps(0)} /> */}
          <Tab label="Email" {...a11yProps(1)} />
          {/* <Tab label="Password" {...a11yProps(2)} /> */}
        </Tabs>
        {/* <TabPanel value={value} index={0}>
          <Overview />
        </TabPanel> */}
        <TabPanel value={value} index={0}>
          <Email />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <Password />
        </TabPanel> */}
      </div>
    </Container>
  );
}
