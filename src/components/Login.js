import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hackernewsclonebackend.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );
      if (res && res.data && res.data.token) {
        setIsAuthenticated(true);
        localStorage.setItem("token", res.data.token);
        setSuccess("Login successful. Redirecting to dashboard...");
        setTimeout(() => {
          history.push("/dashboard");
        }, 2000); // Redirect after 2 seconds
      } else {
        console.error("Invalid response from server");
      }
    } catch (err) {
      console.error(
        "Login Error:",
        err.response ? err.response.data : err.message
      );
      if (err.response && err.response.status === 400) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="formInput">
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={onSubmit} className="">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button className="sbmt" type="submit">
          Login
        </button>
      </form>
      <p className="msg">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
