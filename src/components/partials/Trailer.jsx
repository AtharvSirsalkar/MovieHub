import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute w-screen h-screen flex items-center justify-center z-40 top-0 left-0 text-yellow-100">
      {/* Close Button */}
      <Link
        onClick={() => navigate(-1)}
        className="absolute z-[200] top-4 right-[3%] font-thin cursor-pointer text-3xl text-zinc-600 duration-500 ease-out hover:text-[#E91E63] ri-close-fill"
      ></Link>

      {ytvideo ? (
        <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] aspect-video">
          <ReactPlayer
            controls
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
