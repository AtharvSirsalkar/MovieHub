import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from "react-loader-spinner";

const Tvshows = () => {
  const [category, setcategory] = useState("airing_today");
  const [TvShows, setTvshows] = useState([]);
  const [Query, setQuery] = useState("");
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  const navigate = useNavigate();

  document.title = "Movie HUB | TV " + category.toUpperCase().split("_").join(" ");

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTvshows((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    setpage(1);
    setTvshows([]);
    getTvShows();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return TvShows ? (
    <>
      {/* Full-screen wrapper with fixed dark background */}
      <div className="w-screen min-h-screen bg-[#1f1e24]">
        {/* Header bar */}
        <div className="w-full mb-6 flex px-[3%] items-center justify-between">
          <div className="flex items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              className="font-semibold cursor-pointer text-zinc-400 duration-500 ease-out hover:text-[#E91E63] text-xl ri-arrow-go-back-line"
            ></i>
            <h1 className="text-xl md:text-2xl text-zinc-400 font-semibold">
              TV SHOWS
            </h1>
          </div>

          <div className="flex items-center gap-3 w-[70%] md:w-[80%]">
            <TopNav setQuery={setQuery} Query={Query} />
            <Dropdown
              title={"Category"}
              options={["popular", "top_rated", "on_the_air", "airing_today"]}
              fun={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>

        {/* Infinite Scroll inside dark container */}
        <InfiniteScroll
          className="bg-[#1f1e24]" // 👈 keeps background dark
          loader={
            <div className="p-10 flex items-center justify-center w-full bg-[#1f1e24]">
              <Grid
                visible={true}
                height="80"
                width="80"
                color="#E91E63"
                ariaLabel="grid-loading"
                radius="12.5"
              />
            </div>
          }
          dataLength={TvShows.length}
          next={getTvShows}
          hasMore={hasmore}
        >
          <div className="bg-[#1f1e24]">
            <Cards blur={Query.length} data={TvShows} title="tv" />
          </div>
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Tvshows;
