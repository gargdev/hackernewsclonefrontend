// components/NewsItemList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsItemList = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const res = await axios.get('/api/news');
        setNewsItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNewsItems();
  }, []);

  return (
    <div>
      <h1>News Items</h1>
      <ul>
        {newsItems.map(newsItem => (
          <li key={newsItem._id}>
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.title}</a>
            <p>Upvotes: {newsItem.upvotes}</p>
            <p>Comments: {newsItem.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsItemList;
