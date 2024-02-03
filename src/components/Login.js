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
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
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
    <div className="container bg-slate-300 p-10 w-2/6 flex flex-col gap-9 items-center justify-around outline outline-2 outline-offset-2 rounded-lg outline-none">
      <h2 className="text-4xl font-extrabold mb-10">Login</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-10"
      >
        <input
          className="w-full border p-5 bg-white border border-gray-300 rounded-md outline-none"
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <input
          className="w-full p-5 bg-white border border-gray-300 rounded-md outline-none"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
