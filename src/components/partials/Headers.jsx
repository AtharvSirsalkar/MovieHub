import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Headers = ({ data, blur }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [nextImage, setNextImage] = useState("");
  const [fade, setFade] = useState(false);
  const [overviewText, setOverviewText] = useState("");

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

  // Responsive overview truncation
  useEffect(() => {
    const updateOverview = () => {
      let maxLength = 200; // default for desktop
      if (window.innerWidth < 640) {
        maxLength = 70; // mobile
      } else if (window.innerWidth < 1024) {
        maxLength = 120; // tablet
      }
      setOverviewText(
        data.overview
          ? data.overview.slice(0, maxLength)
          : "No description available"
      );
    };

    updateOverview();
    window.addEventListener("resize", updateOverview);
    return () => window.removeEventListener("resize", updateOverview);
  }, [data]);

  return (
    <div className={`relative w-full h-[40vh] sm:h-[45vh] md:h-[65vh] z-0 ${blur ? "blur-sm" : ""}`}>
      {/* Current background */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(${currentImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        } ${blur ? "backdrop-blur-sm" : ""}`}
      ></div>

      {/* Next background */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(${nextImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        } ${blur ? "backdrop-blur-sm" : ""}`}
      ></div>

      {/* Content */}
      <div
        className={`relative top-[40%] sm:top-[35%] z-10 flex flex-col justify-end items-start px-4 sm:px-6 md:px-12 lg:px-[5%] ${
          blur ? "backdrop-blur-sm" : ""
        }`}
      >
        {/* Title */}
        <h1 className="w-full sm:w-[85%] md:w-[70%] text-xl sm:text-3xl md:text-3xl lg:text-5xl font-black font-['Gilroy'] text-white cursor-default leading-snug">
          {data.name || data.title || data.original_title || data.original_name}
        </h1>

        {/* Overview */}
        <p className="w-full sm:w-[90%] md:w-[75%] lg:w-[70%] text-xs sm:text-base md:text-md text-white mt-3 mb-1 cursor-default">
          {overviewText}...{" "}
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-blue-400 underline hover:text-blue-300"
          >
            more
          </Link>
        </p>

        {/* Extra info */}
        <p className="text-xs sm:text-sm md:text-base text-white flex flex-wrap items-center gap-3 mt-2">
          <span className="flex items-center">
            <i className="ri-megaphone-fill text-yellow-500 mr-1"></i>
            {data.release_date || "No information"}
          </span>
          <span className="flex items-center">
            <i className="ri-album-fill text-yellow-500 mr-1"></i>
            {data.media_type ? data.media_type.toUpperCase() : "UNKNOWN"}
          </span>
        </p>

        {/* Watch Trailer Button */}
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="px-4 py-2 sm:px-5 sm:py-3 bg-[#e0356e] hover:bg-[#e91e63] duration-300 ease-out rounded-lg text-center mt-4 hover:scale-105 text-sm sm:text-base md:text-lg text-white font-semibold"
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Headers;
