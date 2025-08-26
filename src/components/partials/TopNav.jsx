import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import noImage from "../../utils/images/noImage.png";
import { Link } from "react-router-dom";

const TopNav = ({ Query, setQuery, data }) => {
  const [searches, setSearches] = useState([]);

  const getSearched = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${Query}`);
      setSearches(data.results);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (Query) getSearched();
  }, [Query]);

  return (
    <>
      <div className="w-full h-[10vh] flex justify-start px-4 sm:px-6 md:px-[10%] relative items-center">
        {/* Search Icon */}
        <i className="text-lg sm:text-xl md:text-2xl text-zinc-400 ri-search-line"></i>

        {/* Input Box */}
        <div className="w-full sm:w-[300px] md:w-[400px] ml-3">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={Query}
            className="w-full border-none px-3 py-2 sm:px-4 sm:py-3 bg-transparent text-zinc-300 text-base sm:text-lg md:text-xl outline-none"
            type="text"
            placeholder="Search Movies here..."
          />
        </div>

        {/* Clear Button */}
        {Query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="ml-2 text-2xl sm:text-3xl text-zinc-400 ri-close-fill cursor-pointer"
          ></i>
        )}

        {/* Dropdown Results */}
        <div className="w-full sm:w-[80%] md:w-[70%] max-h-[50vh] absolute top-[100%] left-0 sm:left-auto sm:right-0 bg-zinc-900 sm:bg-transparent z-20 rounded-lg overflow-auto shadow-lg">
          {Query.length > 0 &&
            searches.map((search, index) => (
              <Link
                to={`/${search.media_type}/details/${search.id}`}
                key={index}
                className="w-full flex gap-3 sm:gap-5 items-center justify-start font-medium hover:bg-zinc-300 duration-200 border-b border-zinc-800 sm:border-none text-zinc-300 hover:text-black text-sm sm:text-lg md:text-xl px-3 sm:px-5 py-3 sm:py-5"
              >
                <img
                  className="w-[12vh] h-[8vh] sm:w-[20vh] sm:h-[10vh] shadow-lg object-cover rounded"
                  src={
                    search.backdrop_path ||
                    search.profile_path ||
                    search.poster_path
                      ? `https://image.tmdb.org/t/p/original/${
                          search.backdrop_path ||
                          search.profile_path ||
                          search.poster_path
                        }`
                      : noImage
                  }
                  alt=""
                />

                {search.name ||
                search.title ||
                search.original_title ||
                search.original_name ? (
                  <span>
                    {search.name ||
                      search.title ||
                      search.original_title ||
                      search.original_name}
                  </span>
                ) : (
                  <span className="">{"No movies found!"}</span>
                )}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default TopNav;
