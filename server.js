const path = require("path");
const express = require("express");

const {
  getEmployeesAll,
  getEmployees,
  getEmployeeById,
  createNewEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require("./data/data.controller");

const app = express();

app.use(express.json());

app.get("/api/employees/all", (req, res) => {
  res.json(getEmployeesAll());
});

app.get("/api/employees", (req, res) => {
  const { q: query, p: page, l: limit } = req.query;
  res.json(getEmployees(query, page, limit));
});

app.get("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  const employee = getEmployeeById(Number(id));
  employee ? res.json(employee) : res.status(404).send("No employee found");
});

app.post("/api/employees/create", (req, res) => {
  createNewEmployee(req.body);
  res.json(getEmployees());
});

app.post("/api/employees/update/:id", (req, res) => {
  const { id } = req.params;
  updateEmployeeById(Number(id), req.body);
  res.json("Updated");
});

app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  deleteEmployeeById(Number(id));
  res.json(getEmployees());
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(5000, () => console.log("Server listening on port: 5000"));
