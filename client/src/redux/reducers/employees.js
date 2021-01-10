import {
  SET_LOADING,
  FETCH_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_SUCCESS,
  SET_ERROR,
} from "../actions/employees";

const initialState = {
  loading: false,
  data: [],
  totalCount: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING: {
      return { ...state, loading: true };
    }
    case FETCH_EMPLOYEES_SUCCESS: {
      const { employees, totalCount } = action.payload;

      return {
        ...state,
        data: employees,
        totalCount,
        loading: false,
      };
    }
    case ADD_EMPLOYEE_SUCCESS: {
      return { ...state, loading: false };
    }
    case DELETE_EMPLOYEE_SUCCESS: {
      return { ...state, loading: false };
    }
    case SET_ERROR: {
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
