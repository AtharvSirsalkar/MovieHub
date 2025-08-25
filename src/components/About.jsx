import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./partials/Loading";

const About = () => {
  const [Wallpaper, setWallpaper] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
//   const [nextImage, setNextImage] = useState("");
  const [fade, setFade] = useState(false);

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomWallpaper =
        data.results[(Math.random() * data.results.length).toFixed()];
      console.log(
        "randomWallpaper: ",
        (Math.random() * data.results.length).toFixed()
      );
      console.log("randomWallpaper: ", randomWallpaper);

      setWallpaper(randomWallpaper);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!Wallpaper) {
        getWallpaper();
      }
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (Wallpaper) {
      const newImage = `https://image.tmdb.org/t/p/original/${
        Wallpaper.backdrop_path ||
        Wallpaper.profile_path ||
        Wallpaper.poster_path
      }`;

    //   setNextImage(newImage);
      console.log("new image: ", newImage);

      setFade(true);
      const timeout = setTimeout(() => {
        setCurrentImage(newImage);
        setFade(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [Wallpaper]);

  return Wallpaper ?  (
    <div className={`relative w-full h-[100vh]`}>
      <div
        key={currentImage}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(${currentImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500  ${blur ? "blur-sm" : ""} ${
          fade ? "opacity-0" : "opacity-100"
        } animate-zoom`}
      ></div>

      {/* 
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(${nextImage})`,
          backgroundPosition: "top 1%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      ></div> 
      */}

<div className="relative flex flex-col items-start justify-center z-[100] px-10 py-10">
  <h1 className="w-[70%] font-[Poppins] text-5xl font-black text-white cursor-default leading-tight drop-shadow-lg">
    Your Ultimate Ad-Free Movie & TV Trailer Hub
  </h1>

  <p className="w-[70%] text-lg text-gray-200 cursor-default">
    Explore movies and TV shows like never before – search, watch ad-free trailers, 
    discover trending titles, view cast details, and find where to stream them online.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[80%] mt-6">
    <div className="p-4 bg-black/40 rounded-xl shadow-md text-white hover:scale-105 ease duration-500 hover:shadow-lg">
      <i className="ri-movie-2-fill text-3xl text-pink-400"></i>
      <h3 className="text-xl font-semibold mt-2">Ad-Free Trailers</h3>
      <p className="text-sm mt-1">Watch trailers without interruptions or ads.</p>
    </div>

    <div className="p-4 bg-black/40 rounded-xl shadow-md text-white hover:scale-105 ease duration-500 hover:shadow-lg">
      <i className="ri-search-eye-fill text-3xl text-blue-400"></i>
      <h3 className="text-xl font-semibold mt-2">Smart Search</h3>
      <p className="text-sm mt-1">Find any movie, TV series, or actor instantly.</p>
    </div>

    <div className="p-4 bg-black/40 rounded-xl shadow-md text-white hover:scale-105 ease duration-500 hover:shadow-lg">
      <i className="ri-fire-fill text-3xl text-yellow-400"></i>
      <h3 className="text-xl font-semibold mt-2">Trending Now</h3>
      <p className="text-sm mt-1">Discover the hottest movies & shows today.</p>
    </div>
  </div>

  <div className="w-[80%] mt-6 text-white">
    <h2 className="text-2xl font-bold mb-3">How It Works</h2>
    <ol className="list-decimal list-inside space-y-1 text-gray-200">
      <li>Search for your favorite movie or show.</li>
      <li>Watch its trailer & read the description.</li>
      <li>Check where it’s available to watch online.</li>
    </ol>
  </div>

  <p className="w-[80%] text-gray-400 text-sm mt-4 italic">
    This app is powered by the free <span className="text-blue-400">TMDB API</span>, 
    built with <span className="text-pink-400">React.js</span> and 
    <span className="text-pink-400"> Tailwind CSS</span> for a smooth experience.
  </p>

  <Link to="/" className="mt-6">
  <button className="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-xl text-white text-lg font-bold transition-transform hover:scale-105">
    Start Exploring
  </button></Link>
</div>

    </div>
  ): (
    <Loading />
  )
};

export default About;
