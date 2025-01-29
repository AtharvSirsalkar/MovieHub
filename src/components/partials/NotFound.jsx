import React from "react";
import notfound from '../../utils/images/404.gif'

const NotFound = () => {
  return (
    <div className="absolute z-50 top-[0%] h-screen w-screen bg-[#F2F4F8] flex items-center justify-center">
      <img className="max-h-[80vh] max-w-[60vw] object-cover" src={notfound} alt="" />
    </div>
  );
};

export default NotFound;
