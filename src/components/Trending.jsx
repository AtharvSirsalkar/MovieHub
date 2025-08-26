import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from "react-loader-spinner";

const Trending = () => {
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [tranding, settranding] = useState([]);
  const [Query, setQuery] = useState("");
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  const navigate = useNavigate();

  document.title = "Movie HUB | Popular " + category.toUpperCase();

  const getTranding = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        settranding((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    if (tranding.length === 0) {
      getTranding();
    } else {
      setpage(1);
      settranding([]);
      getTranding();
    }
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category, duration]);

  return tranding ? (
    <>
      <div className="w-screen min-h-screen bg-[#1f1e24]">
        {/* Top Header Section */}
        <div className="w-full mb-10 flex flex-col lg:flex-row px-[3%] items-start lg:items-center justify-between gap-5">
          {/* Back + Heading */}
          <div className="flex items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              className="font-semibold cursor-pointer text-zinc-400 duration-500 ease-out hover:text-[#E91E63] text-xl ri-arrow-go-back-line"
            ></i>
            <h1 className="text-2xl text-zinc-400 font-semibold cursor-default">
              Trending {category.toUpperCase()}'s
            </h1>
          </div>

          {/* Search + Dropdowns */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-[70%]">
            <TopNav setQuery={setQuery} Query={Query} />

            <Dropdown
              title={"Category"}
              options={["movie", "tv", "all"]}
              fun={(e) => setcategory(e.target.value)}
            />

            <Dropdown
              title={"Duration"}
              options={["week", "day"]}
              fun={(e) => setduration(e.target.value)}
            />
          </div>
        </div>

        {/* Infinite Scroll Cards */}
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
              />
            </div>
          }
          dataLength={tranding.length}
          next={getTranding}
          hasMore={hasmore}
        >
          <Cards blur={Query.length} data={tranding} title={category} />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Trending;
