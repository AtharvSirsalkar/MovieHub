import React from "react";
import Dropdown from "./Dropdown";

const CardNav = ({ setoption }) => {
  return (
    <div className="px-4 items-center justify-between pt-4 flex sm:items-center sm:justify-between gap-3">
      {/* Heading */}
      <h1 className="text-xl sm:text-3xl font-semibold text-zinc-500 sm:text-left">
        Trending
      </h1>

      {/* Dropdown */}
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <Dropdown
          title="Filter"
          options={["all", "movie", "tv"]}
          fun={(e) => setoption(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CardNav;
