import React from "react";
import Dropdown from "./Dropdown";

const CardNav = ({setoption}) => {
  return (
    <div className="px-5 pt-5 flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-zinc-500">Trending</h1>
      <Dropdown
        title="Filter"
        options={["all", "movie", "tv"]}
        fun={(e) => setoption(e.target.value)}
      />
    </div>
  );
};

export default CardNav;
