const getEditEmployeeState = (state) => state.edit;

export const getEmployee = (state) => getEditEmployeeState(state).data;

export const getLoading = (state) => getEditEmployeeState(state).loading;

export const getError = (state) => {
  return {
    isError: getEditEmployeeState(state).error,
    errorMessage: getEditEmployeeState(state).errorMessage,
  };
};
