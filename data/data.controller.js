let customers = require("./data");

const getCustomers = () => {
  return customers;
};

const getCustomerById = (id) => {
  return customers.find((customer) => customer.id === id);
};

const createNewCustomer = (customer) => {
  customers = [...customers, customer];
};

const deleteCustomerById = (id) => {
  customers = customers.filter((customer) => customer.id !== id);
};

const updateCustomerById = (id, newCustomer) => {
  customers = customers.map((customer) =>
    customer.id === id ? { ...customer, ...newCustomer } : customer
  );
};

module.exports = {
  getCustomers,
  getCustomerById,
  createNewCustomer,
  deleteCustomerById,
  updateCustomerById,
};
