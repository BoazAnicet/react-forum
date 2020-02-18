import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Divider, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  divider: { width: "100%" }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  const Overview = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={0}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Overview" component={Link} to="/settings" />
          <Tab label="Email" component={Link} to="/settings/email" />
          <Tab label="Password" component={Link} to="/settings/password" />
          <Tab label="Delete" component={Link} to="/settings/delete" />
        </Tabs>
        <TabPanel value={0} index={0}>
          <Overview />
        </TabPanel>
      </div>
    </Container>
  );
}
