import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NewsItemList from "./NewsItemList";

const Dashboard = ({ token, setIsAuthenticated }) => {
  const [newsItems, setNewsItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const res = await axios.get("/api/news", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewsItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNewsItems();
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      history.push("/"); // Redirect to the home page
    } catch (err) {
      console.error(
        "Logout Error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <NewsItemList newsItems={newsItems} />
    </div>
  );
};

export default Dashboard;
