// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/news.css";

function NewsItemList() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news")
      .then((response) => {
        setNewsItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news items:", error);
      });
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/news/${id}/read`);
      setNewsItems(
        newsItems.map((item) =>
          item._id === id ? { ...item, read: true } : item
        )
      );
    } catch (error) {
      console.error("Error marking news item as read:", error);
    }
  };

  const markAsDeleted = async (id) => {
    try {
      // Remove the news item from the frontend
      setNewsItems(newsItems.filter((item) => item._id !== id));

      // Remove the news item from the backend
      await axios.delete(`http://localhost:5000/api/news/${id}`);
    } catch (error) {
      console.error("Error deleting news item:", error);
    }
  };

  const deleteNewsItem = (id) => {
    // Update the state to remove the news item without affecting the backend
    setNewsItems(newsItems.filter((item) => item._id !== id));
  };

  return (
    <div className="">
      <ul className="container">
        {newsItems.map((item) => (
          <li key={item._id} className="bg-white-300">
            <a
              href={item.url}
              style={{ textDecoration: item.read ? "line-through" : "none" }}
            >
              {item.title}
            </a>
            {!item.deleted && (
              <span>
                <button
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 cursor-pointer dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => markAsRead(item._id)}
                  disabled={item.read}
                >
                  Mark as Read
                </button>
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => deleteNewsItem(item._id)}
                >
                  Delete
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsItemList;
