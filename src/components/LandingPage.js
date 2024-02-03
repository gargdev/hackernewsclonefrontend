import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useHistory } from "react-router-dom";

const LandingPage = ({ isAuthenticated }) => {
  const history = useHistory();

  // Redirect to dashboard if user is already authenticated
  if (isAuthenticated) {
    history.push("/dashboard");
    return null;
  }

  return (
    <div>
      <h1>Welcome to Hacker News Clone</h1>
      <div>
        <Login />
        <Signup />
      </div>
    </div>
  );
};

export default LandingPage;
