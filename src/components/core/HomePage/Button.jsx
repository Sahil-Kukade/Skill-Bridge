import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto} className="w-full sm:w-fit">
      <div
        className={`text-center w-full sm:w-fit text-[13px] sm:text-[16px] px-4 sm:px-6 py-2 sm:py-3 rounded-md font-bold
        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
        ${
          active
            ? "bg-yellow-50 text-black"
            : "bg-richblack-800 text-richblack-5"
        }
        hover:shadow-none hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
