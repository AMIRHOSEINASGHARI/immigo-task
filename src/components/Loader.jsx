import React from "react";
//components
import { Circles } from "react-loader-spinner";

const Loader = ({ text }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Circles
        height="60"
        width="60"
        color="#3b82f6"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      {text && <h1 className="font-bold text-lg mt-2 text-gray-500">{text}</h1>}
    </div>
  );
};

export default Loader;
