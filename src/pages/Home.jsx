import { useReduce } from "../reducer-context/Reducer-context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar,Navigator } from "../components";
import { getSortedData, getFilteredData } from "../App";

import { useLogin } from "../reducer-context/LoginContext";
import { history_video_add_call } from "../api/serverRequests";

export function Home() {
  const { data, dispatch, sortBy, showCategory } = useReduce();
  const { isUserLogIn } = useLogin();
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);

  let sortedData = getSortedData(data, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  return (
    <>
      <Navigator value="home"/>
      <Navbar />
      <div className="flex flex-wrap lg:flex-row justify-center items-center pb-12 md:pb-0 md:pl-12">
        {filteredData.map((item) => {
          return (
            
              <Link key={item.id} to={`/video/${item.id}`} className="py-2 h-72 px-2 max-w-xs sm:mx-1 md:mx-2 lg:mx-4">
                <div
                  onClick={() => {
                    history_video_add_call(
                      `${process.env.REACT_APP_api}/history/`,
                      {
                        historyId: item.id,
                        lastseen: new Date()
                      },
                      dispatch
                    );
                  }}
                >
                  <div className="">
                    <img
                      src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                      alt="videoimg"
                    />
                    <div className="">
                      {item.duration.toFixed(2)}
                    </div>
                  </div>
                  <div className="">
                    <div className="">{item.title}</div>
                  </div>
                </div>
              </Link>
            
          );
        })}
      </div>
    </>
  );
    }