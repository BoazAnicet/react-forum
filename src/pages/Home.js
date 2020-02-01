import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  makeStyles,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Box
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../components";
import { fetchThreads } from "../actions";
import categories from "../categories";

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const threads = useSelector(state => state.threads);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    dispatch(
      fetchThreads(
        { category: categories[0].toLowerCase() },
        success => setFetching(false),
        fail => {}
      )
    );
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, newValue) => {
    setFetching(true);
    dispatch(
      fetchThreads(
        { category: categories[newValue].toLowerCase() },
        success => setFetching(false),
        fail => {}
      )
    );
    setValue(newValue);
  };

  const renderCategories = () =>
    categories.map((c, i) => <Tab key={c} label={`${c}`} {...a11yProps(i)} />);

  const renderTabPanels = () =>
    categories.map((c, i) => {
      return (
        <TabPanel key={c} value={value} index={i}>
          <Table threads={threads} />
        </TabPanel>
      );
    });

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            {renderCategories()}
          </Tabs>
        </AppBar>
        {fetching ? <></> : renderTabPanels()}
      </div>
    </Container>
  );
};
