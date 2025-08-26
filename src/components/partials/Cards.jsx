import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title, blur }) => {
  return (
    <div
      className={`${
        blur > 0 ? "blur-md" : ""
      } ease-in duration-500 pt-3 flex flex-wrap w-full gap-6 sm:gap-8 md:gap-10 items-center justify-center bg-[#1f1e24]`}
    >
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className={` 
            w-[42vw] h-[38vh]   /* mobile */
            sm:w-[30vw] sm:h-[42vh]   /* small tablets */
            md:w-[22vw] md:h-[45vh]   /* tablets */
            lg:w-[18vw] lg:h-[50vh]   /* laptops */
            xl:w-[16vw] xl:h-[52vh]   /* large screens */
            bg-zinc-900 
            duration-500 ease-out 
            overflow-hidden flex flex-col 
            hover:scale-105 gap-2 transition-all 
            hover:shadow-[8px_17px_48px_10px_rgba(0,0,0,1)]
          `}
        >
          <div
            className="w-full h-[75%] ease-out duration-[1.5s]"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "white",
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                c.poster_path || c.backdrop_path || c.profile_path
              })`,
            }}
          ></div>
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl hover:text-[#E91E63] duration-300 ease-in font-semibold text-zinc-400 px-2 sm:px-3 flex items-center justify-center py-2 text-center">
            {(c.name || c.title || c.original_title || c.original_name)
              .slice(0, 20)
              .toUpperCase()}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
