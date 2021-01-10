import { combineReducers } from "redux";
import employees from "./employees";
import edit from "./edit-employee";

export default combineReducers({ employees, edit });
