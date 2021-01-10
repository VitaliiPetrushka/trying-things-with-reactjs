import axios from "axios";

export const FETCH_EMPLOYEE_LOADING = "FETCH_EMPLOYEE_LOADING";
export const FETCH_EMPLOYEE_SUCCESS = "FETCH_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_LOADING = "UPDATE_EMPLOYEE_LOADING";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_CANCEL = "UPDATE_EMPLOYEE_CANCEL";
export const FETCH_EMPLOYEE_ERROR = "FETCH_EMPLOYEE_ERROR";
export const UPDATE_EMPLOYEE_ERROR = "UPDATE_EMPLOYEE_ERROR";

export const fetchEmployeeLoading = () => {
  return { type: FETCH_EMPLOYEE_LOADING };
};

export const fetchEmployeeError = () => {
  return { type: FETCH_EMPLOYEE_LOADING };
};

export const updateEmployeeLoading = () => {
  return { type: UPDATE_EMPLOYEE_LOADING };
};

export const updateEmployeeError = () => {
  return { type: UPDATE_EMPLOYEE_ERROR };
};

export const fetchEmployeeSuccess = (data) => {
  return { type: FETCH_EMPLOYEE_SUCCESS, payload: data };
};

export const updateEmployeeSuccess = () => {
  return { type: UPDATE_EMPLOYEE_SUCCESS };
};

export const updateEmployeeCancel = () => {
  return { type: UPDATE_EMPLOYEE_CANCEL };
};

export const fetchEmployee = (id) => async (dispatch) => {
  dispatch(fetchEmployeeLoading());
  try {
    const { data } = await axios.get(`/api/employees/${id}`);
    dispatch(fetchEmployeeSuccess(data));
  } catch (error) {
    dispatch(fetchEmployeeError(error));
  }
};

export const updateEmployee = (id, data) => async (dispatch) => {
  dispatch(updateEmployeeLoading());
  try {
    const res = await axios.post(`/api/employees/update/${id}`, data);
    dispatch(updateEmployeeSuccess());
  } catch (error) {
    dispatch(updateEmployeeError(error));
  }
};
