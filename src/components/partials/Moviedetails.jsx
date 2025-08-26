import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynchloadmovie, removemovie } from "../../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCrds from "./HorizontalCrds";

const Moviedetails = () => {
  const { info } = useSelector((state) => state.movie);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynchloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  document.title = "Movie HUB | MOVIE Details";

  return info ? (
    <div className="w-full relative overflow-x-hidden min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full">
        <img
          className="w-full h-full object-cover opacity-30 blur-sm"
          src={`https://image.tmdb.org/t/p/original/${info.details.backdrop_path}`}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="w-full h-16 sm:h-20 px-4 sm:px-6 lg:px-10 flex items-center gap-4 sm:gap-6 lg:gap-10 text-white bg-black/20 backdrop-blur-sm">
          <button
            onClick={() => navigate(-1)}
            className="text-lg sm:text-xl font-semibold cursor-pointer text-zinc-100 duration-500 ease-out hover:text-[#E91E63] ri-arrow-go-back-line"
          />
          <a 
            target="_blank" 
            href={info.details.homepage}
            rel="noopener noreferrer"
            className="text-lg sm:text-xl duration-500 ease-out hover:text-[#E91E63] ri-external-link-line"
          />
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            rel="noopener noreferrer"
            className="text-lg sm:text-xl duration-500 ease-out hover:text-[#E91E63] ri-earth-fill"
          />
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
            rel="noopener noreferrer"
            className="text-sm sm:text-base lg:text-lg duration-500 ease-out hover:text-[#E91E63] font-medium"
          >
            IMDB
          </a>
        </nav>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-20 py-6 lg:py-10">
          {/* Movie Poster and Details */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-12">
            {/* Poster */}
            <div className="flex justify-center lg:justify-start flex-shrink-0">
              <img
                className="w-64 sm:w-72 lg:w-80 xl:w-96 h-auto object-cover rounded-md shadow-xl hover:shadow-[5px_10px_28px_10px_rgba(0,0,0,.6)] hover:scale-105 duration-500 ease-out"
                src={`https://image.tmdb.org/t/p/original/${
                  info.details.poster_path || info.details.backdrop_path
                }`}
                alt={info.details.title || info.details.name}
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-white space-y-4 lg:space-y-6">
              {/* Title */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                  {info.details.name ||
                    info.details.title ||
                    info.details.original_title ||
                    info.details.original_name}
                  <span className="block sm:inline text-lg sm:text-xl lg:text-2xl font-bold text-zinc-300 mt-2 sm:mt-0 sm:ml-2">
                    ({info.details.release_date.slice(0, 4)})
                  </span>
                </h1>
              </div>

              {/* Movie Info */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 text-sm sm:text-base font-semibold">
                <div className="flex justify-center sm:justify-start">
                  <span className="rounded-lg text-base sm:text-lg lg:text-xl font-semibold bg-gradient-to-r from-red-400 to-yellow-400 text-white px-3 py-2 sm:px-4">
                    Rating {(info.details.vote_average * 10).toFixed()}<sup>%</sup>
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="block sm:inline">{info.details.release_date}</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="block sm:inline">{info.details.genres.map((g) => g.name).join(", ")}</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="block sm:inline">
                    Duration: {(info.details.runtime / 60).toFixed(2)} Hours
                  </span>
                </div>
              </div>

              {/* Tagline */}
              {info.details.tagline && (
                <div className="text-center lg:text-left">
                  <h2 className="text-lg sm:text-xl font-semibold italic text-zinc-200">
                    "{info.details.tagline}"
                  </h2>
                </div>
              )}

              {/* Overview */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center lg:text-left">
                  Overview
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-center lg:text-left">
                  {info.details.overview}
                </p>
              </div>

              {/* Available Languages */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center lg:text-left">
                  Available Languages
                </h3>
                <p className="text-sm sm:text-base text-center lg:text-left">
                  {info.translations
                    .map((t) => t)
                    .splice(0, 10)
                    .join(", ")}{" "}
                  and more...
                </p>
              </div>

              {/* Watch Trailer Button */}
              <div className="flex justify-center lg:justify-start pt-4">
                <Link
                  className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 hover:bg-[#E91E63] rounded-lg font-semibold duration-500 ease-out text-sm sm:text-base"
                  to={`${pathname}/trailer`}
                >
                  <i className="text-lg sm:text-xl mr-2 ri-play-fill"></i>
                  Watch Trailer
                </Link>
              </div>
            </div>
          </div>

          {/* Watch Providers */}
          <div className="space-y-4 sm:space-y-6 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center lg:text-left mb-6">
              Watch Options
            </h2>
            
            {/* Available Platforms */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              {info.watchproviders && info.watchproviders.flatrate ? (
                <div className="flex flex-col sm:flex-row gap-4 text-white">
                  <h3 className="font-semibold text-base sm:text-lg min-w-fit text-center sm:text-left">
                    Available on Platforms:
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    {info.watchproviders.flatrate.map((flatrate, index) => (
                      <img
                        key={index}
                        title={flatrate.provider_name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover hover:scale-110 transition-transform"
                        src={`https://image.tmdb.org/t/p/original/${flatrate.logo_path}`}
                        alt={flatrate.provider_name}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-white font-semibold text-center sm:text-left">
                  Not Available on any Platform
                </p>
              )}
            </div>

            {/* Available to Buy */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              {info.watchproviders && info.watchproviders.buy ? (
                <div className="flex flex-col sm:flex-row gap-4 text-white">
                  <h3 className="font-semibold text-base sm:text-lg min-w-fit text-center sm:text-left">
                    Available to Buy:
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    {info.watchproviders.buy.map((buy, index) => (
                      <img
                        key={index}
                        title={buy.provider_name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover hover:scale-110 transition-transform"
                        src={`https://image.tmdb.org/t/p/original/${buy.logo_path}`}
                        alt={buy.provider_name}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-white font-semibold text-center sm:text-left">
                  Not Available to Buy
                </p>
              )}
            </div>

            {/* Available to Rent */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              {info.watchproviders && info.watchproviders.rent ? (
                <div className="flex flex-col sm:flex-row gap-4 text-white">
                  <h3 className="font-semibold text-base sm:text-lg min-w-fit text-center sm:text-left">
                    Available to Rent:
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    {info.watchproviders.rent.map((rent, index) => (
                      <img
                        key={index}
                        title={rent.provider_name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover hover:scale-110 transition-transform"
                        src={`https://image.tmdb.org/t/p/original/${rent.logo_path}`}
                        alt={rent.provider_name}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-white font-semibold text-center sm:text-left">
                  Not Available to Rent
                </p>
              )}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="space-y-6">
            <div className="border-t border-zinc-600 pt-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center lg:text-left mb-6">
                Recommendations & Similar Movies
              </h2>
            </div>

            <div className="w-full">
              {info.recommendations && info.recommendations.length > 0 ? (
                <HorizontalCrds
                  data={
                    info.recommendations.length > 0
                      ? info.recommendations
                      : info.similar
                  }
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-white text-lg sm:text-xl font-semibold">
                    No recommendations available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;