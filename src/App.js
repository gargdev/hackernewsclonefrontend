import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App bg-slate-700 p-96">
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )}
          </Route>
          <Route path="/dashboard">
            <Dashboard
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
