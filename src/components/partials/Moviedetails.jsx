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
    <div
      // style={{
      //   backgroundImage: `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.2),rgba(0,0,0,.9))`,
      //   backgroundPosition: "top 1%",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
      className="w-screen relative overflow-x-hidden "
    >
      <img
        style={{ opacity: ".5" }}
        className="object-cover bg-cover w-full h-[150vh] opacity-50 blur-sm bg-gradient-to-b "
        src={`https://image.tmdb.org/t/p/original/${info.details.backdrop_path}`}
        alt=""
      />
      {/* part 1 navigation */}
      <nav className="w-full absolute z-10 top-0 h-[10vh] px-10 items-center text-zinc-100 flex gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="font-semibold cursor-pointer text-zinc-100 duration-500 ease-out hover:text-[#E91E63] text-xl ri-arrow-go-back-line"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i className="duration-500 ease-out hover:text-[#E91E63] ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="duration-500 ease-out hover:text-[#E91E63] ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="duration-500 ease-out hover:text-[#E91E63]"
        >
          IMDB
        </a>
      </nav>
      {/* part 2 poster and details */}
      <div className="flex w-full absolute z-10 top-[10%] px-20">
        <img
          className="hover:scale-105 object-cover h-[55vh] mt-5 shadow-zinc-900 rounded-md shadow-xl hover:shadow-[5px_10px_28px_10px_rgba(0,0,0,.6)] duration-500 ease-out"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
          alt=""
        />

        <div className="ml-10 text-white">
          <h1 className="text-6xl font-black h-fit cursor-default duration-300 ease-in text-white">
            {info.details.name ||
              info.details.title ||
              info.details.original_title ||
              info.details.original_name}
            <small className="text-2xl text-bold text-zinc-300">
              ({info.details.release_date.slice(0, 4)})
            </small>
          </h1>
          <div className="flex text-white font-semibold items-center gap-x-5 mt-3 mb-5 cursor-default">
            <span className="rounded-lg text-2xl font-semibold bg-gradient-to-r cursor-default from-red-400 to-yellow-400 text-white px-4 py-2 flex justify-center items-center">
              Ratings {(info.details.vote_average * 10).toFixed()} <sup>%</sup>{" "}
            </span>
            <h1>{info.details.release_date}</h1>
            <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
            <h1>
              <span>Duration: </span>
              {(info.details.runtime / 60).toFixed(2)} Hours
            </h1>
          </div>
          <div className="flex gap-5 items-center">
            <h1 className="text-xl font-semibold italic text-zinc-200">
              {info.details.tagline}
            </h1>
          </div>
          <h1 className="text-2xl mt-3 font-semibold mb-1">Overview</h1>
          <p>{info.details.overview}..</p>{" "}
          <h1 className="text-2xl mt-5 font-semibold mb-1">
            Movie Available in
          </h1>
          <p>
            {info.translations
              .map((t) => t)
              .splice(0, 10)
              .join(", ")}{" "}
            and more...
          </p>
          <Link
            className="py-5 px-7 absolute bg-blue-500 rounded-lg mt-3  hover:bg-[#E91E63] duration-500 ease-out"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl mr-2 ri-play-fill"></i>
            Watch Trailer
          </Link>
        </div>
      </div>
      {/* part 3 available on platforms */}
      <div className=" flex flex-col gap-y-5 absolute z-10 top-[72%] h-[10vh] px-20">
        {info.watchproviders && info.watchproviders.flatrate ? (
          <div className="font-semibold flex gap-x-5 text-white">
            <h1 className="cursor-default w-[170px]">Available on Platforms</h1>
            {info.watchproviders.flatrate.map((flatrate) => (
              <img
                title={flatrate.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${flatrate.logo_path}`}
                alt=""
              />
            ))}
          </div>
        ) : (
          <h1 className="cursor-default w-[150px] text-white font-semibold">
            Not Available on any Platform
          </h1>
        )}

        {info.watchproviders && info.watchproviders.buy ? (
          <div className="font-semibold flex gap-x-10 text-white">
            <h1 className="cursor-default w-[150px]">Available to Buy</h1>
            {info.watchproviders.buy.map((buy) => (
              <img
                title={buy.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${buy.logo_path}`}
                alt=""
              />
            ))}
          </div>
        ) : (
          <h1 className="cursor-default w-[150px] text-white font-semibold">
            Not Available to Buy
          </h1>
        )}
        {info.watchproviders && info.watchproviders.rent ? (
          <div className="font-semibold flex gap-x-10 text-white">
            <h1 className="cursor-default w-[150px]">Available on Rent</h1>
            {info.watchproviders.rent.map((rent) => (
              <img
                title={rent.provider_name}
                className="w-[5vh] h-[5vh] rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${rent.logo_path}`}
                alt=""
              />
            ))}
          </div>
        ) : (
          <h1 className="cursor-default w-[170px] text-white font-semibold">
            Not Available to Rent
          </h1>
        )}
      </div>
      {/* part 4 recommondations and similarities */}

      <div className="absolute top-[95%] w-[90vw] font-bold ml-20 text-3xl">
        <hr className="h-[2px] border-none bg-zinc-400 mb-5" />
        <h1 className="mt-5 text-white">Recommendations & Similar stuff</h1>
      </div>

      <div className="absolute top-[102%] w-[100vw] flex items-center justify-center">
        <div className="w-[90vw] self-center flex justify-center items-center">
          {info.recommendations.length > 0 ? (
            <HorizontalCrds
              data={
                info.recommendations.length > 0
                  ? info.recommendations
                  : info.similar
              }
            />
          ) : (
            <h1> Nothing to show </h1>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
