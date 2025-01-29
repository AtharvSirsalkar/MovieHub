import axios from "../../utils/axios";
import React, { useEffect, useRef, useState } from "react";
import noImage from "../../utils/images/noImage.png";
import { Link } from "react-router-dom";

const TopNav = ({ Query, setQuery,data }) => {
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
      <div className=" w-full h-[10vh] flex justify-start px-[10%] relative items-center ">
        <i className="text-2xl text-zinc-400 ri-search-line"></i>
        <div className="w-[400px]">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={Query}
          className="mx-5 w-full border-none p-5 bg-transparent text-zinc-300 text-xl outline-none "
          type="text"
          name=""
          id=""
          placeholder="Search Movies here..."
        />
        </div>

        {Query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-3xl text-zinc-400 ri-close-fill cursor-pointer"
          ></i>
        )}

<div className="w-[70%] max-h-[50vh] absolute top-[100%] bg-transparent z-10  rounded-lg overflow-auto">
          {Query.length > 0 &&
            searches.map((search, index) => {
              return (
                <Link to={`/${search.media_type}/details/${search.id}`}
                  key={index}
                  className="w-[100%] flex gap-5 items-center justify-start  font-semibold hover:bg-zinc-300 duration-200  border-zinc-100 text-zinc-300 hover:text-black dur text-xl p-5 "
                >
                  <img
                    className="w-[20vh] h-[10vh] shadow-lg object-cover rounded"
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
                 
                    {  search.name ||
                      search.title ||
                      search.original_title ||
                      search.original_name ? (<span>{search.name ||
                        search.title ||
                        search.original_title||
                        search.original_name } </span>) : <span className="">{"No movies found!"}</span>}
                  
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TopNav;
