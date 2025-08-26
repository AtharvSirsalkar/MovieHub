import { useState } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden h-[10vh] flex items-center border-none justify-between px-4 py-3 border-b border-zinc-600 z-[10000] relative">
        <h1 className="text-xl font-bold flex items-center text-white">
          <i className="hidden sm:inline text-[#e91e63] ri-movie-ai-fill mr-2"></i>
        </h1>
        <button
          onClick={handleClick}
          className="text-2xl text-white focus:outline-none"
        >
          <i className={open ? "ri-close-fill" : "ri-menu-fill"}></i>
        </button>
      </div>

      {/* Backdrop (only mobile when sidebar open) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          onClick={handleClick}
        ></div>
      )}

      {/* Sidebar / Drawer */}
      <div
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed pt-[50px] md:static left-0 h-full w-[65%] sm:w-[55%] md:w-[250px] lg:w-[20%] bg-[#1F1E24] border-r border-zinc-600 p-3 z-[9999] transition-transform duration-300 ease-in-out`}
      >
        {/* Logo (Desktop only) */}
        <h1 className="hidden md:flex text-2xl font-bold mb-5 items-end justify-center">
          <i className="text-[#e91e63] ri-movie-ai-fill mr-3"></i>
          <span className="text-white cursor-default">MovieHUB</span>
        </h1>

        {/* New Feeds */}
        <nav className="flex flex-col text-base sm:text-lg md:text-xl text-zinc-400 gap-2 sm:gap-3">
          <h1 className="text-white font-semibold text-lg sm:text-xl mt-5 mb-3 cursor-default">
            New feeds  
          </h1>
          <Link
            to="/trending"
            className="hover:bg-[#e91e63] hover:text-white duration-300 ease-in-out rounded-lg px-3 py-2 sm:p-3"
          >
            <i className="ri-fire-fill mr-2 sm:mr-4"></i> Trending
          </Link>
          <Link
            to="/popular"
            className="hover:bg-[#e91e63] hover:text-white duration-300 ease-in-out rounded-lg px-3 py-2 sm:p-3"
          >
            <i className="ri-bard-fill mr-2 sm:mr-4"></i> Popular
          </Link>
          <Link
            to="/movie"
            className="hover:bg-[#e91e63] hover:text-white duration-300 ease-in-out rounded-lg px-3 py-2 sm:p-3"
          >
            <i className="ri-film-fill mr-2 sm:mr-4"></i> Movies
          </Link>
          <Link
            to="/tv"
            className="hover:bg-[#e91e63] hover:text-white duration-300 ease-in-out rounded-lg px-3 py-2 sm:p-3"
          >
            <i className="ri-tv-fill mr-2 sm:mr-4"></i> Tv Shows
          </Link>
          <Link
            to="/people"
            className="hover:bg-[#e91e63] hover:text-white duration-300 ease-in-out rounded-lg px-3 py-2 sm:p-3"
          >
            <i className="ri-team-fill mr-2 sm:mr-4"></i> People
          </Link>
        </nav>

        <hr className="border-transparent bg-zinc-600 h-[1px] my-4 sm:my-6" />

        {/* Info */}
        <nav className="flex flex-col text-base sm:text-lg md:text-xl text-zinc-400 gap-2 sm:gap-3">
          <h1 className="text-white font-semibold text-lg sm:text-xl mt-2 mb-3 cursor-default">
            Our Info
          </h1>
          <Link
            to="/about"
            className="hover:bg-[#e91e63] hover:text-white duration-300 ease-in-out rounded-lg px-3 py-2 sm:p-3"
          >
            <i className="ri-information-fill mr-2 sm:mr-4"></i> About
          </Link>
          <Link
            to="/contact"
            className="hover:bg-[#e91e63] hover:text-white duration-300 ease-in-out rounded-lg px-3 py-2 sm:p-3"
          >
            <i className="ri-phone-fill mr-2 sm:mr-4"></i> Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
