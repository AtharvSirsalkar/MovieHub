import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  document.title = "Movie HUB | TV" + " "+category.toUpperCase().split('_').join(" ");
  ;
  
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
    if (TvShows.length === 0) {
      getTvShows();
    } else {
      setpage(1);
      setTvshows([]);
      getTvShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return TvShows ? (
    <>
      <div className="w-screen h-screen bg-[#1f1e24]">
        <div className="w-full mb-10 flex px-[3%] items-center  justify-between">
          <div className="flex items-center justify-center gap-3">
            <i
              onClick={() => navigate(-1)}
              className="font-semibold cursor-pointer text-zinc-400 duration-500 ease-out hover:text-[#E91E63] text-xl ri-arrow-go-back-line"
            ></i>
            <h1 className="text-2xl text-zinc-400 font-semibold cursor-default">
             TV SHOWS
            </h1>
          </div>
          <div className="flex  items-center w-[80%]">
            <TopNav setQuery={setQuery} Query={Query} />
            <Dropdown
              title={"Category"}
              options={["popular","top_rated","on_the_air","airing_today"]}
              fun={(e) => setcategory(e.target.value)}
            />
            
          </div>
        </div>
        <InfiniteScroll
          loader={
            <div className="p-28 flex items-center justify-center w-full bg-[#1f1e24]">

              <Grid
                visible={true}
                height="80"
                width="80"
                color="#E91E63"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
              />
            </div>
          }
          dataLength={TvShows.length}
          next={getTvShows}
          hasMore={hasmore}
        >
          <Cards blur={Query.length} data={TvShows} title='tv' />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Tvshows