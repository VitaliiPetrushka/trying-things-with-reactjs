import React from "react";
import Container from "@material-ui/core/Container";

import { EmployeesGrid } from "../components/employees-grid/EmployeesGrid";
import "./index.css";

export default function Index() {
  return (
    <div className="page">
      <Container maxWidth="md">
        <header>
          <div className="header--title">Employees</div>
        </header>
        <EmployeesGrid />
      </Container>
    </div>
  );
}
