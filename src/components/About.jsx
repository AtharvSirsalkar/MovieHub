import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./partials/Loading";

const About = () => {
  const [Wallpaper, setWallpaper] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [fade, setFade] = useState(false);

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomWallpaper =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWallpaper(); // initial
    const intervalId = setInterval(() => {
      getWallpaper();
    }, 8000); // change every 8s

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (Wallpaper) {
      const newImage = `https://image.tmdb.org/t/p/original/${
        Wallpaper.backdrop_path ||
        Wallpaper.profile_path ||
        Wallpaper.poster_path
      }`;

      setFade(true);
      const timeout = setTimeout(() => {
        setCurrentImage(newImage);
        setFade(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [Wallpaper]);

  return Wallpaper ? (
    <div className="relative z-[999] w-full min-h-screen">
      {/* Background (fixed, always covers screen) */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <img
          src={currentImage}
          alt="background"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-start justify-center z-10 px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14 lg:py-20 space-y-8">
        <h1 className="w-full md:w-3/4 lg:w-2/3 font-[Poppins] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-lg">
          Your Ultimate Ad-Free Movie & TV Trailer Hub
        </h1>

        <p className="w-full md:w-3/4 lg:w-2/3 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
          Explore movies and TV shows like never before – search, watch ad-free
          trailers, discover trending titles, view cast details, and find where
          to stream them online.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:w-4/5">
          <div className="p-5 bg-black/40 backdrop-blur-sm rounded-xl shadow-md text-white hover:scale-105 duration-500 border border-white/10">
            <i className="ri-movie-2-fill text-3xl text-pink-400 block mb-2"></i>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Ad-Free Trailers
            </h3>
            <p className="text-sm text-gray-300">
              Watch trailers without interruptions or ads.
            </p>
          </div>

          <div className="p-5 bg-black/40 backdrop-blur-sm rounded-xl shadow-md text-white hover:scale-105 duration-500 border border-white/10">
            <i className="ri-search-eye-fill text-3xl text-blue-400 block mb-2"></i>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Smart Search
            </h3>
            <p className="text-sm text-gray-300">
              Find any movie, TV series, or actor instantly.
            </p>
          </div>

          <div className="p-5 bg-black/40 backdrop-blur-sm rounded-xl shadow-md text-white hover:scale-105 duration-500 border border-white/10">
            <i className="ri-fire-fill text-3xl text-yellow-400 block mb-2"></i>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Trending Now
            </h3>
            <p className="text-sm text-gray-300">
              Discover the hottest movies & shows today.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="w-full md:w-4/5 text-white">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm md:text-base">
              <li>Search for your favorite movie or show.</li>
              <li>Watch its trailer & read the description.</li>
              <li>Check where it's available to watch online.</li>
            </ol>
          </div>
        </div>

        {/* Footer Info */}
        <div className="w-full md:w-4/5">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-5 border border-white/10">
            <p className="text-gray-400 text-sm">
              This app is powered by the free{" "}
              <span className="text-blue-400 font-semibold">TMDB API</span>, built with{" "}
              <span className="text-pink-400 font-semibold">React.js</span> and{" "}
              <span className="text-pink-400 font-semibold">Tailwind CSS</span> for a smooth
              experience.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/" className="mt-4">
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-xl text-white text-lg font-bold transition-transform hover:scale-105 shadow-lg">
            <i className="ri-arrow-right-line mr-2"></i>
            Start Exploring
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default About;
