import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import TopNav from "./partials/TopNav";
import Headers from "./partials/Headers";
import axios from "../utils/axios";
import HorizontalCrds from "./partials/HorizontalCrds";
import Loading from "./partials/Loading";
import CardNav from "./partials/CardNav";

const Home = () => {
  document.title = "Movie HUB | Home";
  const [Query, setQuery] = useState("");
  const [option,setoption] = useState("all")
  const [tranding, settranding] = useState(null);
  const [Wallpaper, setWallpaper] = useState(null);
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

  const getTranding = async () => {
    try {
      const { data } = await axios.get(`/trending/${option}/day`);
        settranding(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    getTranding();
  }, [option]);

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      if(!Wallpaper){
        getWallpaper();
      }
    }, 4000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  

  return Wallpaper && tranding ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-x-hidden">
        <TopNav Query={Query} setQuery={setQuery} data={tranding} />
        <Headers data={Wallpaper} blur={Query.length > 0} />
        <CardNav setoption={setoption} />
        <HorizontalCrds data={tranding} setoption={setoption}/>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
