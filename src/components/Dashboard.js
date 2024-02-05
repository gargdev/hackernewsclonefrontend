import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NewsItemList from "./NewsItemList";

const Dashboard = ({ token, setIsAuthenticated }) => {
  const history = useHistory();

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
    <div className="h-full">
      <div className="flex h-[10%] flex-row justify-between items-center">
        <h1 className="text-gray-900 text-2xl">Dashboard</h1>
        <h1 className="text-black">News Items</h1>
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="p-5 mt-5 h-[70%] overflow-scroll shadow-lg hide-scroll-bar">
        {<NewsItemList />}
      </div>
    </div>
  );
};

export default Dashboard;
