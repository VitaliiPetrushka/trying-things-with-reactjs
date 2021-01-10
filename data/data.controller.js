let employees = require("./index");

const getEmployeesAll = () => {
  return {
    employees,
    totalCount: employees.length,
  };
};

const getEmployees = (query, page, limit) => {
  const _p = page || 1;
  const _l = limit || 10;
  const start = (_p - 1) * _l;
  const end = _p * _l;
  let query_result = null;

  if (query) {
    query_result = employees.filter((e) =>
      e.first_name.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  const _employees = query_result || employees;
  return {
    employees: _employees.slice(start, end),
    totalCount: _employees.length,
  };
};

const getEmployeeById = (id) => {
  return employees.find((employee) => employee.id === id);
};

const createNewEmployee = (employee) => {
  let employees_length = employees.length;
  employee.id = employee.id || ++employees_length;
  employees = [...employees, employee];
};

const deleteEmployeeById = (id) => {
  employees = employees.filter((employee) => employee.id !== id);
};

const updateEmployeeById = (id, newEmployee) => {
  employees = employees.map((employee) =>
    employee.id === id ? { ...employee, ...newEmployee } : employee
  );
};

module.exports = {
  getEmployeesAll,
  getEmployees,
  getEmployeeById,
  createNewEmployee,
  deleteEmployeeById,
  updateEmployeeById,
};
