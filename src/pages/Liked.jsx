import { useReduce } from "../reducer-context/Reducer-context";
import { getSortedData, getFilteredData } from "../App";
import noVideos from "../assets/empty.svg";
import { Navigator, Navbar } from "../components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  history_video_add_call,
  liked_video_delete_call
} from "../api/serverRequests";

export function Liked() {
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);
  let { likedlist, dispatch, sortBy, showCategory, data } = useReduce();

  const likeddata = likedlist.map((eachitem) => {
    let finddata = data.find((item) => item.id === eachitem);
    if (finddata) {
      return finddata;
    }
    return {};
  });

  let sortedData = getSortedData(likeddata, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  function Likedlist() {
    return filteredData.map((item) => {
      return (
        
          <div key={item.id} className="flex justify-between items-center p-2">
            <Link to={`/video/${item.id}`}>
              <div
                className=""
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
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                  alt=""
                />
                <div className="">{item.title}</div>
              </div>
            </Link>
            <button
              className=""
              onClick={async () => {
                let likedlistmsg = await liked_video_delete_call(
                  `${process.env.REACT_APP_api}/liked/`,
                  { likedId: item.id },
                  dispatch
                );
                const notify = () => toast.dark(likedlistmsg);
                notify();
              }}
            >
              <span>x</span>
            </button>
          </div>
        
      );
    });
  }

  return (
    <>
      <Navbar />

      <Navigator value="liked" />

      <div className="px-2 pb-16 md:pb-0 md:pl-12">
        <div className="py-3">Liked Videos</div>
        {Likedlist().length === 0 ? (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width:"40%",
              minWidth:"150px",
              maxWidth:"300px",
              textAlign:"center"
            }}
          >
            <img src={noVideos} style={{borderRadius:"5%",width:"100%" }}/>
              
            You Haven't Liked Any Video
          </div>
        ) : (
          Likedlist()
        )}
      </div>
    </>
  );
}