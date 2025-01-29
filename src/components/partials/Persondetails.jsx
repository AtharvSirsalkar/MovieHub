import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import {
  asynchloadpeople,
  removepeople,
} from "../../store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCrds from "./HorizontalCrds";

const Persondetails = () => {
  const [catgory, setcatgory] = useState("movie");
  const { info } = useSelector((state) => state.people);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynchloadpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id]);

  document.title = "people HUB | PEOPLE Details";
  return info ? (
    <div className="px-[7%] w-screen bg-[#1F1E24] pb-16 h-fit">
      {/* Part 1 navigation */}
      <nav className="w-full h-[8vh] items-center text-zinc-100 flex gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="font-semibold  cursor-pointer text-zinc-100 duration-500 ease-out hover:text-[#E91E63] text-xl ri-arrow-go-back-line"
        ></Link>
      </nav>

      <div className="w-full flex mt-1">
        {/* Part 2 Left Post and Details */}
        <div className="w-[28%]">
          <img
            className="hover:scale-105 object-cover w-[75%] h-[40vh] shadow-zinc-900 rounded-md shadow-xl hover:shadow-[5px_10px_28px_10px_rgba(0,0,0,.6)] duration-500 ease-out"
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt=""
          />
          <hr className="h-[2px] border-none mt-10 w-[77%] bg-zinc-500 mb-5" />
          {/* Social media links*/}

          <div className="text-2xl flex gap-x-5 text-white">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="duration-500 ease-out hover:text-[#E91E63] ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="duration-500 ease-out hover:text-[#0866FF] ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="duration-500 ease-out hover:text-[#DB2871] ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i className="duration-500 ease-out hover:text-[#DB2871] ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="font-semibold text-lg text-zinc-400">Known for</h1>
          <h1 className="text-zinc-400">{info.details.known_for_department}</h1>
          <h1 className="font-semibold text-lg text-zinc-400 mt-3">Gender</h1>
          <h1 className="text-zinc-400">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="font-semibold text-lg text-zinc-400 mt-3">Birthday</h1>
          <h1 className="text-zinc-400">{info.details.birthday}</h1>
          <h1 className="font-semibold text-lg text-zinc-400 mt-3">Deathday</h1>
          <h1 className="text-zinc-400">
            {info.details.deathday
              ? info.details.birthday
              : "Fucking still ALIVE"}
          </h1>
          <h1 className="font-semibold text-lg text-zinc-400 mt-3">
            Place Of Birth
          </h1>
          <h1 className="text-zinc-400">{info.details.place_of_birth}</h1>
          <h1 className="font-semibold text-lg text-zinc-400 mt-3">
            Also known As
          </h1>
          <h1 className="text-zinc-400">
            {info.details.also_known_as.join(", ")}
          </h1>
        </div>
        {/* Part 3 right Details and Information */}
        <div className="w-[80%] overflow-auto h-[90vh]">
          <h1 className="text-6xl font-black text-zinc-400 my-5">
            {info.details.name}
          </h1>
          <h1 className="font-semibold text-2xl text-zinc-400">Biography</h1>
          <p className="text-zinc-400 mt-5">{info.details.biography}</p>
          <h1 className="font-semibold text-2xl text-zinc-400 mt-5">Work</h1>
          <HorizontalCrds data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between mt-10">
            <h1 className="font-semibold text-2xl text-zinc-400">Acting</h1>
            <Dropdown
              title="Catgory"
              options={["tv", "movie"]}
              fun={(e) => setcatgory(e.target.value)}
            />
          </div>
          <div className="w-full h-[50vh] rounded list-disc text-zinc-400 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.2)]  border-2 border-zinc-700 mt-5">
            {info[catgory + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white hover:bg-[#151418] p-5 duration-300 ease-out cursor-pointer"
              >
                <Link to={`/${catgory}/details/${c.id}`} className="">
                  <span>
                    {c.name || c.title || c.original_title || c.original_name}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;
