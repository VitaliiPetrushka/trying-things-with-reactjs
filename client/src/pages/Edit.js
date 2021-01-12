import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  TextField,
  Radio,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  CardContent,
  CardActions,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import {
  fetchEmployee,
  updateEmployeeCancel,
  updateEmployee,
} from "../redux/actions/edit-employee";
import {
  getEmployee,
  getLoading,
  getError,
} from "../redux/selectors/edit-employee";
import "./index.css";

function Edit({ employee, isLoading, error }) {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [department, setDepartment] = useState(null);

  const handleEdit = () => {
    const data = {
      ...employee,
      first_name: firstName || employee.first_name,
      last_name: lastName || employee.last_name,
      email: email || employee.email,
      gender: gender || employee.gender,
      department: department || employee.department,
    };

    dispatch(updateEmployee(id, data));

    if (!isLoading && !error.isError) history.push("/");
  };

  const handleCancel = () => {
    dispatch(updateEmployeeCancel());
    history.push("/");
  };

  useEffect(() => {
    dispatch(fetchEmployee(id));
  }, []);

  return (
    <div className="page">
      <Container maxWidth="md">
        <header>
          <div className="header--title">
            {employee && !isLoading && `Edit employee ${id}`}
            {error.isError && error.errorMessage}
          </div>
        </header>
        {!employee && isLoading && <CircularProgress />}
        {employee && (
          <Card style={{ maxWidth: 400 }}>
            {isLoading && <LinearProgress />}
            <CardContent style={{ padding: 20 }}>
              <TextField
                label="First Name"
                fullWidth
                defaultValue={employee.first_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></TextField>
              <TextField
                style={{ marginTop: 10 }}
                label="Last Name"
                fullWidth
                defaultValue={employee.last_name}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></TextField>
              <TextField
                style={{ marginTop: 10 }}
                label="Email"
                defaultValue={employee.email}
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></TextField>
              <FormControl style={{ marginTop: 30 }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="Gender"
                  defaultValue={employee.gender.toLowerCase()}
                  onChange={(e) => {
                    setGender(e.target.value.toLowerCase());
                  }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                label="Department"
                defaultValue={employee.department}
                fullWidth
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              ></TextField>
            </CardContent>
            <CardActions
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Save
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  employee: getEmployee(state),
  isLoading: getLoading(state),
  error: getError(state),
});

export default connect(mapStateToProps)(Edit);
