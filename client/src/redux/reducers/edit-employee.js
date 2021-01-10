import {
  FETCH_EMPLOYEE_LOADING,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_LOADING,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_CANCEL,
} from "../actions/edit-employee";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEE_LOADING:
    case UPDATE_EMPLOYEE_LOADING: {
      return { ...state, loading: true };
    }
    case FETCH_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case UPDATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        data: null,
        loading: false,
      };
    }
    case UPDATE_EMPLOYEE_CANCEL: {
      return {
        ...state,
        data: null,
        loading: false,
      };
    }
    case FETCH_EMPLOYEE_ERROR:
    case UPDATE_EMPLOYEE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}
