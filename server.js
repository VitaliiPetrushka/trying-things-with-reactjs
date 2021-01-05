const express = require("express");
const {
  getCustomers,
  getCustomerById,
  createNewCustomer,
  updateCustomerById,
  deleteCustomerById,
} = require("./data/data.controller");

const app = express();

app.use(express.json());

app.get("/api/customers", (req, res) => {
  res.json(getCustomers());
});

app.get("/api/customers/:id", (req, res) => {
  const { id } = req.params;
  res.json(getCustomerById(Number(id)));
});

app.post("/api/customers/create", (req, res) => {
  // {
  //   id: 11,
  //   first_name: "Callean",
  //   last_name: "Sprouls",
  //   email: "csproulsa@creativecommons.org",
  //   gender: "Male",
  //   department: "Product Management",
  // };

  createNewCustomer(req.body);
  res.json(getCustomers());
});

app.post("/api/customers/update/:id", (req, res) => {
  const { id } = req.params;
  updateCustomerById(Number(id), req.body);
  res.json("Updated");
});

app.delete("/api/customers/:id", (req, res) => {
  const { id } = req.params;
  deleteCustomerById(Number(id));
  res.json(getCustomers());
});

app.listen(5000, () => console.log("Server listening on port: 5000"));
