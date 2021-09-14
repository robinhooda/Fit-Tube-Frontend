import { useReduce } from "../reducer-context/Reducer-context";
import { useEffect, useState } from "react";
import noVideos from "../assets/empty.svg";
import { getSortedData, getFilteredData } from "../App";
import { Link } from "react-router-dom";
import { Navbar, Navigator } from "../components";
import { toast } from "react-toastify";
import {
  playlist_delete_call,
  playlist_video_delete_call
} from "../api/serverRequests";

export function Playlist() {
  let { data, playlist, dispatch, sortBy, showCategory } = useReduce();

  const [currentplaylist, setplaylist] = useState(0);

  let datapass =
    playlist[currentplaylist] === undefined
      ? []
      : playlist[currentplaylist].videos;

  let dataarr = datapass.map((item) => {
    return data.find((item1) => item1.id === item);
  });

  let sortedData = getSortedData(dataarr, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  function Showplaylist() {
    return filteredData.map((item) => {
      return (
        
          <div key={item.id} className="playlist-card flex justify-between items-center p-2 ">
            <Link to={`/video/${item.id}`}>
              {" "}
              <div
                className="playlist-card-data"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_HISTORY",
                    payload: {
                      historyId: item.id,
                      lastseen: new Date()
                    }
                  });
                }}
              >
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                  alt=""
                />
                <div className="playlist-card-desc">{item.title}</div>
              </div>
            </Link>
            <button
              className="icon-button lg"
              onClick={async () => {
                let playlistmsg = await playlist_video_delete_call(
                  `${process.env.REACT_APP_api}/`,
                  {
                    playlistid: playlist[currentplaylist].id,
                    videoid: item.id
                  },
                  dispatch
                );
                const notify = () => toast.dark(playlistmsg);
                notify();
              }}
            >
              <span>x</span>
            </button>
          </div>
        
      );
    });
  }
  function Removeandupdate(index) {
    setplaylist((prev) => {
      if (prev === index) {
        if (index + 1 < playlist.length) {
          return index;
        } else {
          return index - 1;
        }
      }
      if (prev === playlist.length - 1) {
        return prev - 1;
      }
      return prev;
    });
  }

  return (
    <>
      <Navbar />
      <Navigator value="playlist" />
      <div className="wrapper pl-12">
        <h3>
          {playlist[currentplaylist] !== undefined
            ? "Playlist Names"
            : "No Playlist Present"}
        </h3>
        <ul className="list playlistname">
          {playlist.map((item, index) => {
            return (
              
                <li
                  key={item.id}
                  style={{
                    background: currentplaylist === index ? "#f2f2f2" : ""
                  }}
                  className="flex justify-between items-center p-2 my-1"
                >
                  <div onClick={() => setplaylist(index)} className="relative flex-grow">{item.name}</div>
                  <button
                    className=""
                    onClick={() => {
                      (async function () {
                        let playlistmsg = await playlist_delete_call(
                          `${process.env.REACT_APP_api}/playlist`,
                          { playlistid: item.id },
                          dispatch
                        );
                        Removeandupdate(index);
                        const notify = () => toast.dark(playlistmsg);
                        notify();
                      })();
                    }}
                  >
                    <span>x</span>
                  </button>
                </li>
              
            );
          })}
        </ul>

        <h3 className="">
          {playlist[currentplaylist] !== undefined
            ? `Playlist - ${playlist[currentplaylist].name}`
            : ""}
        </h3>

        <div className=""style={{position:"relative"}}>
          {playlist[currentplaylist] !== undefined
            ? playlist[currentplaylist].videos.length !== 0
              ? Showplaylist()
              : <div style={{
                position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%,0%)",
              width:"20%",
              minWidth:"150px",
              maxWidth:"300px",
              textAlign:"center"
              }}>
                 
                You Have'nt Added Any Videos Yet.
                </div>
            : <div style={{position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width:"40%",
            minWidth:"150px",
            maxWidth:"300px",
            textAlign:"center"
            
            }}>
              <img src={noVideos} style={{borderRadius:"5%"}}/> 
              You Have'nt Added Any Playlist Yet.
              </div>}
        </div>
      </div>
    </>
  );
}