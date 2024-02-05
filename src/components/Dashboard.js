import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NewsItemList from "./NewsItemList";

const Dashboard = ({ token, setIsAuthenticated }) => {
  // const [newsItems, setNewsItems] = useState([]);
  const history = useHistory();

  // useEffect(() => {
  //   const fetchNewsItems = async () => {
  //     try {
  //       const res = await axios.get("/api/news", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setNewsItems(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchNewsItems();
  // }, [token]);

  const handleLogout = async () => {
    try {
      await axios.post("https://hackernewsclonebackend.onrender.com/api/auth/logout");
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
    <div className="">
      <div className="flex flex-row justify-between items-center mb-5 p-5">
        <h1>Dashboard</h1>
        <h1>News Items</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {<NewsItemList />}
    </div>
  );
};

export default Dashboard;
