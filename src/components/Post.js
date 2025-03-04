import React, { useMemo, useState } from "react";
import {
  Paper,
  Avatar,
  Grid,
  Typography,
  makeStyles,
  Divider,
  SvgIcon
} from "@material-ui/core";
import { Reply, FormatQuote, Report, Edit, Delete } from "@material-ui/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import Editor from "../components/Editor";
import { Link } from "react-router-dom";

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
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: "5px 0 5px 10px"
  },
  author: { padding: 10 },
  options: {
    padding: "5px 10px"
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: 6
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  link: {
    textDecoration: "none"
  }
}));

export default props => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const { body, created, author, edited } = props.post;
  const [value, setValue] = useState(body);
  const editor = useMemo(() => withReact(createEditor()), []);
  // eslint-disable-next-line
  const [editing, setEditing] = useState(false);

  return (
    <Paper elevation={1} className={classes.paper}>
      <Grid className={classes.date}>
        <Typography variant="caption">
          {moment(created).format("LLL")}
        </Typography>
      </Grid>

      <Grid container item spacing={1} className={classes.author}>
        <Grid
          item
          container
          xs={12}
          md={2}
          spacing={0}
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography
              variant="subtitle1"
              className={classes.link}
              component={Link}
              to={`/profile/${author._id}`}
            >
              {author.username}
            </Typography>
          </Grid>

          {/* <Grid item>
            <Typography variant="caption">Member</Typography>
          </Grid> */}

          <Grid item>
            <Avatar
              src={author.photo}
              className={classes.large}
              alt={author.username}
            />
          </Grid>

          <Grid item>
            <Typography variant="caption">{`Joined: ${moment(
              author.joinDate
            ).fromNow()}`}</Typography>
          </Grid>

          {/* <Grid item>
            <Typography variant="caption">{`Posts: ${author.postCount}`}</Typography>
          </Grid> */}
        </Grid>

        <Grid item xs={12} md={10} style={{ padding: 0 }}>
          <Editor
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
            readOnly={!editing}
          />

          {edited ? (
            <Typography variant="caption">
              <em>Last edited by User Name on Jan. 1st, 2020 at 12:11 PM</em>
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Divider></Divider>
      <Grid
        container
        direction="column"
        alignItems="flex-end"
        className={classes.options}
      >
        <Grid item className={classes.iconsContainer}>
          {user ? (
            author._id === user._id ? (
              <>
                <Grid
                  item
                  className={classes.icons}
                  // onClick={() => setEditing(!editing)}
                >
                  <SvgIcon>
                    <Edit width={18} />
                  </SvgIcon>
                  <Typography variant="caption">Edit</Typography>
                </Grid>
                <Grid item className={classes.icons}>
                  <SvgIcon>
                    <Delete width={18} />
                  </SvgIcon>
                  <Typography variant="caption">Delete</Typography>
                </Grid>
              </>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          <Grid item className={classes.icons}>
            <SvgIcon>
              <Reply width={18} />
            </SvgIcon>
            <Typography variant="caption">Reply</Typography>
          </Grid>
          <Grid item className={classes.icons}>
            <SvgIcon>
              <FormatQuote width={18} />
            </SvgIcon>
            <Typography variant="caption">Quote</Typography>
          </Grid>
          <Grid item className={classes.icons}>
            <SvgIcon>
              <Report width={18} />
            </SvgIcon>
            <Typography variant="caption">Report</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
