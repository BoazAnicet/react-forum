import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Grid, Breadcrumbs, Typography } from "@material-ui/core";
import { capitalize } from "../utils/helperFunctions";
import { Link } from "react-router-dom";

import {
  // fetchPosts,
  fetchThreads
} from "../actions";
import { Container, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0)
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  }
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const [category, setCategory] = useState(
  //   props.match.url.split("/")[2].toLowerCase()
  // );
  const category = props.match.url.split("/")[2].toLowerCase();
  const [loading, setLoading] = useState(true);
  // const posts = useSelector(state => state.posts);
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth={"md"}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/forum">
                Home
              </Link>
              <Typography color="textPrimary">
                {capitalize(category)}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableBody>
                {(rowsPerPage > 0
                  ? threads.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : threads
                ).map(thread => (
                  <TableRow key={thread._id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/thread/${thread._id}`}>{thread.title}</Link>
                    </TableCell>
                    <TableCell align="right">
                      {"Adam"}
                      {/* {thread.author.firstName || "Adam"} */}
                    </TableCell>
                    <TableCell align="right">{thread.created}</TableCell>
                  </TableRow>
                ))}
                {/* {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))} */}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      15,
                      25,
                      { label: "All", value: -1 }
                    ]}
                    colSpan={3}
                    count={threads.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}

// import React, { useState, useEffect } from "react";
// import { Table, Loader } from "semantic-ui-react";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { connect, useSelector } from "react-redux";
// import { fetchPosts, fetchThreads } from "../actions";
// import { Container, CircularProgress } from "@material-ui/core";

// const Category = ({ fetchThreads, ...props }) => {
//   const [category, setCategory] = useState(
//     props.match.url.split("/")[2].toLowerCase()
//   );
//   const [loading, setLoading] = useState(true);
//   const posts = useSelector(state => state.posts);
//   const threads = useSelector(state => state.threads);

//   // state = {
//   //   category: this.props.match.url.split("/")[2].toLowerCase(),
//   //   loading: true
//   // };

//   // componentDidMount() {
//   //   this.props.fetchPosts(
//   //     { category: this.state.category },
//   //     success => this.setState({ loading: false }),
//   //     fail => {}
//   //   );
//   // }

//   useEffect(() => {
//     fetchThreads(
//       { category },
//       success => setLoading(false),
//       fail => {}
//     );
//   }, []);
//   // useEffect(() => {
//   //   props.fetchPosts(
//   //     { limit: 10 },
//   //     success => setLoading(false),
//   //     fail => {}
//   //   );
//   // }, []);

//   const renderThreads = () => {
//     return threads.map(thread => (
//       <Table.Row key={thread._id}>
//         <Table.Cell>
//           <span
//           // style={{
//           //   // whiteSpace: "nowrap",
//           //   overflow: "hidden",
//           //   textOverflow: "ellipsis"
//           // }}
//           >
//             <Link to={`/thread/${thread._id}`}>{thread.title}</Link>
//           </span>
//           <br />
//           <span style={{ color: "#999" }}>
//             {moment(thread.created).format("MMM Do, YYYY")}
//           </span>
//         </Table.Cell>
//         <Table.Cell>
//           <p>{`${thread.author.firstName}`}</p>
//         </Table.Cell>
//         <Table.Cell>
//           <br />
//           {/* <span>{thread.views}</span> */}
//         </Table.Cell>
//       </Table.Row>
//     ));
//   };
//   // const renderPosts = () => {
//   //   return posts.map(post => (
//   //     <Table.Row key={post._id}>
//   //       <Table.Cell>
//   //         <span
//   //         // style={{
//   //         //   // whiteSpace: "nowrap",
//   //         //   overflow: "hidden",
//   //         //   textOverflow: "ellipsis"
//   //         // }}
//   //         >
//   //           <Link to={`/post/${post._id}`}>{post.title}</Link>
//   //         </span>
//   //         <br />
//   //         <span style={{ color: "#999" }}>
//   //           {moment(post.createdAt).format("MMM Do, YYYY")}
//   //         </span>
//   //       </Table.Cell>
//   //       <Table.Cell>
//   //         <p>{`${post.author}`}</p>
//   //       </Table.Cell>
//   //       <Table.Cell>
//   //         <span>{post.comments.length}</span>
//   //         <br />
//   //         <span>{post.views}</span>
//   //       </Table.Cell>
//   //     </Table.Row>
//   //   ));
//   // };

//   return loading ? (
//     <Container>
//       <CircularProgress>Loading</CircularProgress>
//     </Container>
//   ) : posts ? (
//     <Container>
//       <Table>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Topics</Table.HeaderCell>
//             <Table.HeaderCell>Author</Table.HeaderCell>
//             <Table.HeaderCell>Replies/Views</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>{renderThreads()}</Table.Body>
//       </Table>
//     </Container>
//   ) : (
//     <>{props.history.push("/")}</>
//   );
// };

// export default connect(null, { fetchPosts, fetchThreads })(Category);

// import React from "react";
// import { Table, Container, Loader } from "semantic-ui-react";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { fetchPosts } from "../actions";

// class Category extends React.Component {
//   state = {
//     category: this.props.match.url.split("/")[2].toLowerCase(),
//     loading: true
//   };

//   componentDidMount() {
//     this.props.fetchPosts(
//       { category: this.state.category },
//       success => this.setState({ loading: false }),
//       fail => {}
//     );
//   }

//   renderPosts = () => {
//     return this.props.posts.map(post => (
//       <Table.Row key={post._id}>
//         <Table.Cell>
//           <span
//           // style={{
//           //   // whiteSpace: "nowrap",
//           //   overflow: "hidden",
//           //   textOverflow: "ellipsis"
//           // }}
//           >
//             <Link to={`/post/${post._id}`}>{post.title}</Link>
//           </span>
//           <br />
//           <span style={{ color: "#999" }}>
//             {moment(post.createdAt).format("MMM Do, YYYY")}
//           </span>
//         </Table.Cell>
//         <Table.Cell>
//           <p>{`${post.author}`}</p>
//         </Table.Cell>
//         <Table.Cell>
//           <span>{post.comments.length}</span>
//           <br />
//           <span>{post.views}</span>
//         </Table.Cell>
//       </Table.Row>
//     ));
//   };

//   render() {
//     return this.state.loading ? (
//       <Container>
//         <Loader active>Loading</Loader>
//       </Container>
//     ) : this.props.posts ? (
//       <Container>
//         <Table>
//           <Table.Header>
//             <Table.Row>
//               <Table.HeaderCell>Topics</Table.HeaderCell>
//               <Table.HeaderCell>Author</Table.HeaderCell>
//               <Table.HeaderCell>Replies/Views</Table.HeaderCell>
//             </Table.Row>
//           </Table.Header>
//           <Table.Body>{this.renderPosts()}</Table.Body>
//         </Table>
//       </Container>
//     ) : (
//       <>{this.props.history.push("/")}</>
//     );
//   }
// }

// const mapStateToProps = ({ posts }) => ({ posts });

// export default connect(mapStateToProps, { fetchPosts })(Category);
