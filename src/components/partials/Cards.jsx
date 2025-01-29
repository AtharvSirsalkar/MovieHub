import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title, blur }) => {
  
  return (
    <div
      className={`${
        blur > 0 ? "blur-md" : ""
      } ease-in duration-500 pt-3 flex flex-wrap w-full gap-10 items-center justify-center bg-[#1f1e24]`}
    >
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`}
          className={`w-[30vh] bg-zinc-900 h-[52vh] duration-500 ease-out overflow-y-hidden flex flex-col  overflow-x-hidden hover:scale-105 gap-2 transition-all hover:shadow-[8px_17px_48px_10px_rgba(0,0,0,1)]`}
          key={i}
        >
          <div
            className="h-[230vh] object-cover bg-center ease-out duration-[1.5s]"
            style={{
              backgroundSize: "cover",
              backgroundColor:"white",
              backgroundPosition: "center",              
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                c.poster_path || c.backdrop_path || c.profile_path
              })`,
            }}
          ></div>
          <h1 className="text-2xl hover:text-[#E91E63] duration-300 ease-in h-full font-semibold text-zinc-400 px-3 flex items-center justify-center py-2 text-center">
            {(c.name || c.title || c.original_title || c.original_name).slice(
              0,
              20
            ).toUpperCase()}
          </h1>
          <span></span>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
