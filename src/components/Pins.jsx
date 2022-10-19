import React, { useContext } from "react";
import { Link } from "react-router-dom";
// context
import { SavedNewsProvider } from "../contexts/SavedNewsContext";
// components
import News from "./News";

const Pins = () => {
  const { savedState } = useContext(SavedNewsProvider);

  return (
    <div>
      {savedState.savedNews.length === 0 ? (
        <div className="flex items-center justify-center flex-col h-80 space-y-4">
          <h1 className="text-gray-600 font-bold">No Pins Existed!</h1>
          <Link
            to="/"
            className="rounded-full py-1 px-5 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150"
          >
            See Latest News
          </Link>
        </div>
      ) : (
        <div
          className={`grid ${
            savedState.savedNews.length === 1
              ? "grid-cols-1 p-5"
              : "card-grid-layout-primary"
          }`}
        >
          {savedState.savedNews.map((el) => (
            <News key={el.id} {...el} simplified={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pins;
