import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Index from "./pages/Index";
import Edit from "./pages/Edit";
import Add from "./pages/Add";

export function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/employees/edit/:id">
            <Edit />
          </Route>
          <Route path="/employees/new">
            <Add />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
