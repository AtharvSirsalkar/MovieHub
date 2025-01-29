import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../utils/images/noImage.png";

const HorizontalCrds = ({ data, setoption }) => {
  return (
    <>
      <div className="w-full h-[45vh] px-5 py-7">
        <div className="w-full flex duration-200 ease-out gap-5 overflow-x-auto">
          {data.length > 0 ? (
            data.map((elem, index) => {
              return (
                <Link
                  to={`/${elem.media_type}/details/${elem.id}`}
                  key={index}
                  className="min-w-[18%] duration-200 mb-5 rounded-lg bg-zinc-900 h-[40vh]  ease-in-out flex flex-col gap-2 "
                >
                  {elem.backdrop_path ||
                  elem.profile_path ||
                  elem.poster_path ? (
                    <img
                      className="w-full rounded-t-lg duration-500 img-transition ease-out object-cover bg-center h-[55%]"
                      src={`https://image.tmdb.org/t/p/original/${
                        elem.backdrop_path ||
                        elem.profile_path ||
                        elem.poster_path
                      }`}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-full rounded-t-lg duration-500 img-transition ease-out object-cover bg-center h-[55%]"
                      src={noImage}
                      alt=""
                    />
                  )}

                  <div className="h-[45%] overflow-auto">
                    <h1 className=" text-xl font-semibold font-['Gilroy'] px-2 text-white cursor-default mb-2">
                      {elem.name ||
                        elem.title ||
                        elem.original_title ||
                        elem.original_name}
                    </h1>
                    {elem.overview ? (
                      <p className=" px-2 text-white cursor-default">
                        {elem.overview.slice(0, 50)}...{" "}
                        <span className="text-zinc-600">more</span>{" "}
                      </p>
                    ) : (
                      <p className="text-white mt-3 mb-1 cursor-default">
                        No overview available
                      </p>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <h1 className="text-3xl font-black text-center mt-5 text-white">
              Nothing to Show{" "}
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default HorizontalCrds;
