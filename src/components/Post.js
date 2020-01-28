import React from "react";
import { Paper, Avatar, Grid, Typography, makeStyles } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: 10,
    overflow: "hidden"
  },
  text: {
    whiteSpace: "pre-line"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  date: {
    color: "#FFF",
    backgroundColor: "#333",
    padding: 5
  },
  author: { padding: 10 },
  signature: {
    // padding: 10
  }
}));

export default props => {
  const classes = useStyles();
  const { body, created, author, edited } = props.post;

  return (
    <Paper elevation={1} className={classes.paper}>
      <Grid xs={12} className={classes.date}>
        <Typography variant="caption">{`Posted ${moment(created).format(
          "LLL"
        )}`}</Typography>
      </Grid>

      <Grid container item spacing={1} className={classes.author}>
        <Grid
          item
          container
          xs={12}
          md={3}
          spacing={0}
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="subtitle1" className={classes.link}>
              {author.firstName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Member</Typography>
          </Grid>
          <Grid item>
            <Avatar src={author.avatar} className={classes.large} />
          </Grid>

          <Grid item>
            <Typography variant="caption">{`Joined: ${moment(
              author.joinDate
            ).format("MMM. Do, YYYY")}`}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="caption">{`Posts: ${"99"}`}</Typography>
          </Grid>
          {/* <Divider orientation="vertical" /> */}
        </Grid>

        <Grid item xs={12} md={9} style={{ padding: 10 }}>
          {/* <Typography color="textSecondary" variant="caption">{`Posted ${moment(
            created
          ).format("LLL")}`}</Typography> */}
          <div className={classes.text}>
            {ReactHtmlParser(ReactHtmlParser(body))}
          </div>

          {edited ? (
            <Typography variant="caption">
              <em>
                Last edited by Adam Pontepie on Jan. 1st, 2020 at 12:11 PM
              </em>
            </Typography>
          ) : (
            <></>
          )}

          {!author.signature ? (
            <>
              <Divider />
              <br />
              <Typography variant="caption" className={classes.signature}>
                Lorum ipsum~~~~
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
