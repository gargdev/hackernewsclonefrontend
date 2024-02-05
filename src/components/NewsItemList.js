// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/news.css";

function NewsItemList() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://hackernewsclonebackend.onrender.com/api/news")
      .then((response) => {
        setNewsItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news items:", error);
      });
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`https://hackernewsclonebackend.onrender.com/api/news/${id}/read`);
      setNewsItems(
        newsItems.map((item) =>
          item._id === id ? { ...item, read: true } : item
        )
      );
    } catch (error) {
      console.error("Error marking news item as read:", error);
    }
  };

  // const markAsDeleted = async (id) => {
  //   try {
  //     // Remove the news item from the frontend
  //     setNewsItems(newsItems.filter((item) => item._id !== id));

  //     // Remove the news item from the backend
  //     await axios.delete(`https://hackernewsclonebackend.onrender.com/api/news/${id}`);
  //   } catch (error) {
  //     console.error("Error deleting news item:", error);
  //   }
  // };

  const deleteNewsItem = (id) => {
    // Update the state to remove the news item without affecting the backend
    setNewsItems(newsItems.filter((item) => item._id !== id));
  };

  return (
    <div>
      <ul className="container w-full">
        {newsItems.map((item) => (
          <li key={item._id}>
            <a
              href={item.url}
              style={{ textDecoration: item.read ? "line-through" : "none" }}
            >
              {item.title}
            </a>
            {!item.deleted && (
              <span>
                <button
                  onClick={() => markAsRead(item._id)}
                  disabled={item.read}
                >
                  Mark as Read
                </button>
                <button onClick={() => deleteNewsItem(item._id)}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsItemList;
