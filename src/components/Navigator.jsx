import { useReduce } from "../reducer-context/Reducer-context";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sort } from "./Sort";
import { FaThumbsUp, FaHistory, FaHome, FaFilter } from "react-icons/fa";
import { MdVideoLibrary, MdImportExport } from "react-icons/md";
export function Navigator({ value }) {
  let { dispatch } = useReduce();

  const [showsort, setshowsort] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  return (
    <>
      <div className="flex justify-between md:justify-center w-full bottom-0 px-3 md:px-0 md:flex-col md:max-w-max bg-black md:bg-white fixed md:left-0 md:top-0 md:py-10 md:min-h-screen">
        <Link to="/" className="p-2">
          <FaHome
            className={`text-2xl my-2 text-white md:text-black ${
              value === "home" && "text-blue md:text-blue"
            }`}
          />
        </Link>
        <Link to="/playlist" className="p-2">
          <MdVideoLibrary className={`text-2xl my-2 text-white md:text-black ${
              value === "playlist" && "text-blue md:text-blue"
            }`} />
        </Link>

        <Link to="/liked" className="p-2">
          <FaThumbsUp className={`text-2xl my-2 text-white md:text-black ${
              value === "liked" && "text-blue md:text-blue"
            }`} />
        </Link>

        <Link to="/history" className="p-2">
          <FaHistory className={`text-2xl my-2 text-white md:text-black ${
              value === "history" && "text-blue md:text-blue"
            }`} />
        </Link>

        {/* <Link to="" className="p-2">
          <button onClick={() => setshowsort((prev) => !prev)} className="flex flex-col items-center ">
          <MdImportExport className="text-2xl my-2 text-white md:text-black"/>
          </button>
        </Link> */}
      </div>

      <div className="" style={{ display: showsort ? "block" : "none" }}>
        <Sort setshowsort={setshowsort} />
      </div>
    </>
  );
}
