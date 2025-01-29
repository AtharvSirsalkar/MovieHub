import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Headers = ({ data, blur }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [nextImage, setNextImage] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const newImage = `https://image.tmdb.org/t/p/original/${
      data.backdrop_path || data.profile_path || data.poster_path
    }`;
    setNextImage(newImage);

    setFade(true);
    const timeout = setTimeout(() => {
      setCurrentImage(newImage);
      setFade(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <div className={`relative w-full h-[59vh] z-0 ${blur ? "blur-sm" : ""}`}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(${currentImage})`,
          backgroundPosition: "top 1%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        } ${blur ? "backdrop-blur-sm" : ""}`}
      ></div>

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(${nextImage})`,
          backgroundPosition: "top 1%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        } ${blur ? "backdrop-blur-sm" : ""}`}
      ></div>

      <div
        className={`relative top-[30%] z-10 flex flex-col justify-end items-start p-[5%] ${
          blur ? "backdrop-blur-sm" : ""
        }`}
      >
        <h1 className="w-[70%] text-5xl font-black font-['Gilroy'] text-white cursor-default">
          {data.name || data.title || data.original_title || data.original_name}
        </h1>
        <p className="w-[70%] text-white mt-3 mb-1 cursor-default">
          {data.overview.slice(0, 200)}...{" "}
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-blue-400"
          >
            more
          </Link>
        </p>
        <p className="text-white">
          <i className="ri-megaphone-fill text-yellow-500 mr-1"></i>
          {data.release_date || "No information"}
          <i className="ri-album-fill text-yellow-500 mr-1 ml-5"></i>
          {data.media_type.toUpperCase()}
        </p>
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="p-4 bg-[#e0356e] hover:bg-[#e91e63] duration-300 ease-out border-none rounded text-center mt-4 hover:scale-105 text-white font-semibold"
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Headers;
