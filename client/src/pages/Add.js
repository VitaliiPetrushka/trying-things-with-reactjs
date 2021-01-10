import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewEmployee } from "../redux/actions/employees";
import { getLoading, getError } from "../redux/selectors/employees";
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
  Typography,
  FormHelperText,
} from "@material-ui/core";
import "./index.css";

export default function Add() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [department, setDepartment] = useState(null);
  const [isValidationError, setValidationError] = useState(false);

  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);

  // TODO: handle proper validation
  const isValid = (data) => {
    let isValid = true;

    for (let value of Object.values(data)) {
      if (!value) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  const handleAddNewEmployee = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      gender: gender,
      department: department,
    };

    if (isValid(data)) {
      dispatch(addNewEmployee(data));
      if (!isLoading && !isError) history.push("/");
    } else setValidationError(true);
  };

  return (
    <div className="page">
      <Container maxWidth="md">
        <header>
          <div className="header--title">New employee</div>
        </header>
        <Card style={{ maxWidth: 400 }}>
          {isLoading && <LinearProgress />}
          <CardContent style={{ padding: 20 }}>
            <TextField
              label="First Name *"
              fullWidth
              error={isValidationError}
              helperText={"Required field"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></TextField>
            <TextField
              style={{ marginTop: 10 }}
              label="Last Name *"
              fullWidth
              error={isValidationError}
              helperText={"Required field"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></TextField>
            <TextField
              style={{ marginTop: 10 }}
              label="Email *"
              fullWidth
              error={isValidationError}
              helperText={"Required field"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></TextField>
            <FormControl style={{ marginTop: 30 }} error={isValidationError}>
              <FormLabel component="legend">Gender *</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="Gender"
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
              {isValidationError && (
                <FormHelperText>Required field</FormHelperText>
              )}
            </FormControl>
            <TextField
              label="Department *"
              fullWidth
              error={isValidationError}
              helperText={"Required field"}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            ></TextField>
            <Typography
              style={{ fontSize: "0.9rem", color: "#b1b1b1", marginTop: 15 }}
            >
              * - required fields
            </Typography>
          </CardContent>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 20,
              paddingTop: 10,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewEmployee}
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
