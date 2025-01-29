import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <>
      <div className="w-[20%] h-full border-r-[2px] border-zinc-600 p-3">
        <h1 className="text-2xl font-bold ">
          <i className="text-[#e91e63] ri-movie-ai-fill mr-3"></i>
          <span className="text-white cursor-default">Movie HUB</span>
        </h1>
        <nav className="flex flex-col text-xl text-zinc-400 gap-3 ">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5 cursor-default">
            New feeds
          </h1>
          <Link to='/trending' className="hover:bg-[#e91e63] hover:text-white  duration-500 ease-in-out hover:text-[21px]  rounded-lg p-3">
            <i className="ri-fire-fill mr-4"></i> Trending
          </Link>
          <Link to={'/popular'} className="hover:bg-[#e91e63] hover:text-white  duration-500 ease-in-out hover:text-[21px] rounded-lg p-3">
            <i className="ri-bard-fill mr-4"></i> Popular
          </Link>
          <Link to={'/movie'} className="hover:bg-[#e91e63] hover:text-white  duration-500 ease-in-out hover:text-[21px] rounded-lg p-3">
            <i className="ri-film-fill mr-4"></i> Movies
          </Link>
          <Link to={'/tv'} className="hover:bg-[#e91e63] hover:text-white  duration-500 ease-in-out hover:text-[21px] rounded-lg p-3">
            <i className="ri-tv-fill mr-4"></i> Tv Shows
          </Link>
          <Link to={'/people'} className="hover:bg-[#e91e63] hover:text-white  duration-500 ease-in-out hover:text-[21px] rounded-lg p-3">
            <i className="ri-team-fill mr-4"></i> People
          </Link>
        </nav>
        <hr className="border-transparent bg-zinc-400 h-[1px] mt-6" />
        <nav className="flex flex-col text-xl text-zinc-400 gap-3 ">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5 cursor-default">
            Our Info
          </h1>
          <Link className="hover:bg-[#e91e63] hover:text-white  duration-500 ease-in-out hover:text-[21px]  rounded-lg p-3">
            <i className="ri-information-fill mr-4"></i> About
          </Link>
          <Link className="hover:bg-[#e91e63] hover:text-white  duration-500 ease-in-out hover:text-[21px] rounded-lg p-3">
            <i className="ri-phone-fill mr-4"></i> Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
