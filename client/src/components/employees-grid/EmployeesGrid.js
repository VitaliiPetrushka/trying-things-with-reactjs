import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { useEmployeesGridStyles } from "./EmployeesGridStyles";
import { fetchEmployees, deleteEmployee } from "../../redux/actions/employees";
import {
  getEmployees,
  getLoading,
  getEmployeesTotalCount,
} from "../../redux/selectors/employees";

export function EmployeesGrid() {
  const classes = useEmployeesGridStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const employees = useSelector(getEmployees);
  const employeesTotalCount = useSelector(getEmployeesTotalCount);
  const isLoading = useSelector(getLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchEmployees(searchQuery, page + 1, rowsPerPage));
  }, [searchQuery, page, rowsPerPage]);

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
    dispatch(fetchEmployees(page + 1, rowsPerPage));
  };

  return (
    <Paper>
      <Box display="flex" justifyContent="space-between" padding="16px">
        <TextField
          label="Search"
          onChange={(e) => {
            setPage(0);
            setSearchQuery(e.target.value);
          }}
        />
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          onClick={() => {
            history.push(`/employees/new`);
          }}
        >
          <span className="material-icons">add</span>
        </Fab>
      </Box>
      <Box height="4px">{isLoading && <LinearProgress />}</Box>

      <TableContainer className={classes.container}>
        <Table aria-label="table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees &&
              employees.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell>{e.id}</TableCell>
                  <TableCell align="left">{e.first_name}</TableCell>
                  <TableCell align="left">{e.email}</TableCell>
                  <TableCell align="right">{e.gender}</TableCell>
                  <TableCell align="right">{e.department}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => history.push(`/employees/edit/${e.id}`)}
                    >
                      <span className="material-icons">create</span>
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => {
                        handleDeleteEmployee(e.id);
                      }}
                    >
                      <span className="material-icons">delete</span>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employeesTotalCount || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event, newPage) => {
          setPage(newPage);
        }}
        onChangeRowsPerPage={(event) => {
          setRowsPerPage(event.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
}
