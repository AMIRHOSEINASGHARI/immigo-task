import React, { useState, useEffect } from "react";
//api functions
import { fetchNews } from "../services/fetchFromAPI";
//components
import Loader from "./Loader";
import News from "./News";

const NPRNews = () => {
  const [news, setNews] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setNews(await fetchNews());
    };
    fetchData();
  }, []);
  if (Object.keys(news).length === 0)
    return <Loader text="Loading NPR News..." />;
  return (
    <div className="card-grid-layout-primary">
      {news.items.map((el) => (
        <News key={el.id} {...el} />
      ))}
    </div>
  );
};

export default NPRNews;
