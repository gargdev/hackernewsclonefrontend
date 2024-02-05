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
      const res = await axios.post(
        "https://hackernewsclonebackend.onrender.com/api/auth/signup",
        {
          username,
          password,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="formInput">
      <form onSubmit={onSubmit} className="">
        <h1 className="">Sign Up</h1>
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
          minLength="6"
          required
        />
        <button type="submit" className="sbmt">
          Sign Up
        </button>
      </form>
      <p className="msg">
        Already have an account?{" "}
        <Link to="/" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
