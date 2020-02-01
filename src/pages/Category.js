import React, { useState, useEffect } from "react";
import { Grid, Breadcrumbs, Typography } from "@material-ui/core";
import { capitalize } from "../utils/helperFunctions";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { fetchThreads } from "../actions";
import { Container, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

export default function(props) {
  const category = props.match.url.split("/")[2].toLowerCase();
  const [loading, setLoading] = useState(true);
  const threads = useSelector(state => state.threads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchThreads(
        { category },
        success => setLoading(false),
        fail => {}
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={"md"}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/forums">
                <Typography>Home</Typography>
              </Link>
              <Typography color="textPrimary">
                {capitalize(category)}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <br />
          <Table threads={threads} />
        </>
      )}
    </Container>
  );
}
