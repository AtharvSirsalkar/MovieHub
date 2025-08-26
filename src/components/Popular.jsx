import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from "react-loader-spinner";

const Popular = () => {
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [Query, setQuery] = useState("");
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  const navigate = useNavigate();
  document.title = "Movie HUB | Popular " + category.toUpperCase();

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular ? (
    <>
      <div className="w-screen min-h-screen bg-[#1f1e24]">
        {/* Header Section */}
        <div className="w-full mb-6 px-[3%] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Back Button + Heading */}
          <div className="flex items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              className="font-semibold cursor-pointer text-zinc-400 duration-500 ease-out hover:text-[#E91E63] text-xl ri-arrow-go-back-line"
            ></i>
            <h1 className="text-xl sm:text-2xl text-zinc-400 font-semibold cursor-default">
              Popular {category.toUpperCase()}'s
            </h1>
          </div>

          {/* Search + Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-[60%]">
            <TopNav setQuery={setQuery} Query={Query} />
            <Dropdown
              title={"Category"}
              options={["tv", "movie"]}
              fun={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>

        {/* Infinite Scroll Cards */}
        <InfiniteScroll
          loader={
            <div className="p-16 flex items-center justify-center w-full bg-[#1f1e24]">
              <Grid
                visible={true}
                height="60"
                width="60"
                color="#E91E63"
                ariaLabel="grid-loading"
                radius="12.5"
              />
            </div>
          }
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasmore}
        >
          <Cards blur={Query.length} data={popular} title={category} />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Popular;
