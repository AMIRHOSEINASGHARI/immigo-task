import React from "react";
import { Route, Routes } from "react-router-dom";
//components
import Home from "./components/Home";
import SavedNewsContext from "./contexts/SavedNewsContext";
import Header from "./components/Header";
import Pins from "./components/Pins";
import NPRNews from "./components/NPRNews";
import CommentContext from "./contexts/CommentContext";

const App = () => {
  return (
    <CommentContext>
      <SavedNewsContext>
        <Header />
        <div className="max-w-[1300px] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pins" element={<Pins />} />
            <Route path="/news" element={<NPRNews />} />
          </Routes>
        </div>
      </SavedNewsContext>
    </CommentContext>
  );
};

export default App;
