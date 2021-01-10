const getEmployeesState = (state) => state.employees;

export const getEmployees = (state) => getEmployeesState(state).data;

export const getLoading = (state) => getEmployeesState(state).loading;

export const getError = (state) => getEmployeesState(state).error;

export const getEmployeesTotalCount = (state) =>
  getEmployeesState(state).totalCount;
