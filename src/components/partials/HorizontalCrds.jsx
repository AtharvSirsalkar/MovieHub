import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../utils/images/noImage.png";

const HorizontalCrds = ({ data, setoption }) => {
  return (
    <div className="w-full px-3 sm:px-5 py-5 sm:py-7">
      <div className="w-full flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide duration-200 ease-out">
        {data.length > 0 ? (
          data.map((elem, index) => {
            return (
              <Link
                to={`/${elem.media_type}/details/${elem.id}`}
                key={index}
                className="min-w-[65%] sm:min-w-[40%] md:min-w-[25%] lg:min-w-[18%] h-[30vh] sm:h-[35vh] md:h-[40vh] bg-zinc-900 rounded-lg flex flex-col gap-2 mb-4 duration-200 ease-in-out"
              >
                {elem.backdrop_path ||
                elem.profile_path ||
                elem.poster_path ? (
                  <img
                    className="w-full h-[55%] object-cover bg-center rounded-t-lg duration-500 ease-out"
                    src={`https://image.tmdb.org/t/p/original/${
                      elem.backdrop_path ||
                      elem.profile_path ||
                      elem.poster_path
                    }`}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-full h-[55%] object-cover bg-center rounded-t-lg duration-500 ease-out"
                    src={noImage}
                    alt="no poster"
                  />
                )}

                <div className="h-[45%] overflow-auto px-2">
                  <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white cursor-default mb-1">
                    {elem.name ||
                      elem.title ||
                      elem.original_title ||
                      elem.original_name}
                  </h1>
                  {elem.overview ? (
                    <p className="text-sm sm:text-base text-white cursor-default">
                      {elem.overview.slice(0, 50)}...{" "}
                      <span className="text-zinc-500">more</span>
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base text-white cursor-default mt-2">
                      No overview available
                    </p>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-center mt-5 text-white">
            Nothing to Show
          </h1>
        )}
      </div>
    </div>
  );
};

export default HorizontalCrds;
