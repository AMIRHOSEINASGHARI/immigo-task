import React, { useEffect, useState } from "react";
//api functions
import { fetchNews } from "../services/fetchFromAPI";
//components
import Loader from "./Loader";
import News from "./News";

const Home = () => {
  const [news, setNews] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setNews(await fetchNews());
    };
    fetchData();
  }, []);
  if (Object.keys(news).length === 0) return <Loader text="Loading News..." />;
  const { description, icon, items } = news;
  return (
    <div>
      <div className="flex items-center justify-center flex-col space-y-2 my-5 p-3">
        <img className="w-20 md:w-36" src={icon} alt="NPR Logo" />
        <h1 className="text-center font-bold text-lg text-blue-500 ">
          {description}
        </h1>
      </div>
      <hr className="m-3" />
      <h1 className="font-bold text-lg text-blue-500 text-center">
        Latest 5 News Published
      </h1>
      <div className="card-grid-layout-primary">
        {items.splice(0, 5).map((el) => (
          <News key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};

export default Home;
