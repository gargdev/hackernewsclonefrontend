// components/Signup.js

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container bg-slate-300 p-10 w-2/6 flex flex-col gap-9 items-center justify-around outline outline-2 outline-offset-2 rounded-lg outline-none">
      <h1 className="text-4xl font-extrabold mb-10">Sign Up</h1>
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
          className="w-full border p-5 bg-white border border-gray-300 rounded-md outline-none"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
