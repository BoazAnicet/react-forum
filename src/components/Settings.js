import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

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

export default ({ value, Panel }) => {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          className={classes.tabs}
        >
          <Tab label="Overview" component={Link} to="/settings" />
          <Tab label="Email" component={Link} to="/settings/email" />
          <Tab label="Password" component={Link} to="/settings/password" />
          <Tab label="Delete" component={Link} to="/settings/delete" />
        </Tabs>
        <TabPanel value={value} index={value}>
          <Panel user={user} />
        </TabPanel>
      </div>
    </Container>
  );
};
