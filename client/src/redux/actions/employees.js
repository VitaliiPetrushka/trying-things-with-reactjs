import axios from "axios";

export const SET_LOADING = "SET_LOADING";
export const FETCH_EMPLOYEES_SUCCESS = "FETCH_EMPLOYEES_SUCCESS";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const SET_ERROR = "SET_ERROR";

export const setLoading = () => {
  return { type: SET_LOADING };
};
export const setError = (error) => {
  return { type: SET_ERROR, error };
};

export const fetchEmployeesSuccess = (data) => {
  return { type: FETCH_EMPLOYEES_SUCCESS, payload: data };
};

export const deleteEmployeeSuccess = () => {
  return { type: DELETE_EMPLOYEE_SUCCESS };
};

export const addEmployeeSuccess = () => {
  return { type: ADD_EMPLOYEE_SUCCESS };
};

export const fetchEmployees = (page, limit, query) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const q = (query && query.trim()) || "";
    const p = page || 1;
    const l = limit || 5;
    const { data } = await axios.get(`/api/employees/?q=${q}&p=${p}&l=${l}`);
    dispatch(fetchEmployeesSuccess(data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.delete(`/api/employees/${id}`);
    dispatch(deleteEmployeeSuccess());
  } catch (error) {
    dispatch(setError(error));
  }
};

export const addNewEmployee = (data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.post("/api/employees/create", data);
    dispatch(addEmployeeSuccess());
  } catch (error) {
    dispatch(setError(error));
  }
};
