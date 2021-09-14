import { useReduce } from "../reducer-context/Reducer-context";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Navbar } from "../components";
import { useLogin } from "../reducer-context/LoginContext";
import { toast } from "react-toastify";
import {FaThumbsUp,FaRegThumbsUp} from "react-icons/fa"
import {MdPlaylistAdd} from "react-icons/md"
import {
  liked_video_add_call,
  liked_video_delete_call,
  history_video_add_call,
  playlist_add_call,
  playlist_video_add_call
} from "../api/serverRequests";

export function VideoBlock() {
  let { videoId } = useParams();
  const navigate = useNavigate();
  const [showmodal, setshowmodal] = useState(false);

  const { data, dispatch, likedlist } = useReduce();
  const { isUserLogIn } = useLogin();
  let videoobj;
  if (data.length > 0) {
    videoobj = data.find((item) => item.id === videoId);
  }
  function Like_button(itempassed) {
    return likedlist.reduce(
      (defaultbutton, item) => {
        if (item === itempassed.id) {
          return (
            <button
              className="mx-2"
              onClick={async () => {
                let likedmsg = await liked_video_delete_call(
                  `${process.env.REACT_APP_api}/liked/`,
                  { likedId: item },
                  dispatch
                );
                const notify = () => toast.dark(likedmsg);
                notify();
              }}
            >
              < FaThumbsUp className="text-2xl"/>Unlike
            </button>
          );
        }
        return defaultbutton;
      },
      <button
        className="mx-2"
        onClick={async () => {
          if (isUserLogIn) {
            let likedmsg = await liked_video_add_call(
              `${process.env.REACT_APP_api}/liked`,
              { likedId: itempassed.id },
              dispatch
            );
            const notify = () => toast.dark(likedmsg);
            notify();
          } else {
            navigate("/login");
          }
        }}
      >
        <FaRegThumbsUp className="text-2xl"/>Like
      </button>
    );
  }
  useEffect(() => {
    videoobj === undefined && navigate("/404");
  }, []);
  return (
    <>
      <Navbar />
      
      {data.length > 0 && videoobj !== undefined && (
        <div className="flex justify-center">
          <div className="w-screen sm:w-10/12 sm:flex sm:justify-center flex-col items-center">
            <iframe
              height="200"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=0&showinfo=0&watch-later=0&controls=captions`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen="allowFullscreen"
              className="w-full h-80 sm:h-10/12"
            ></iframe>
            <br />
            <div className="">{videoobj.title}</div>
            <div className="">
              {Like_button(videoobj)}

              <button
                className="mx-2"
                onClick={() => {
                  if (isUserLogIn) {
                    setshowmodal((prev) => !prev);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <MdPlaylistAdd className="text-2xl"/>Save
              </button>
            </div>
          </div>
          {showmodal === true ? (
            <PlaylistModal setshowmodal={setshowmodal} videoId={videoId} />
          ) : (
            ""
          )}

        </div>
      )}
    </>
  );
}

function PlaylistModal({ setshowmodal, videoId }) {
  const [newplaylist, setnewplaylist] = useState("");
  const [showinput, setshowinput] = useState(false);

  const { dispatch, playlist } = useReduce();

  return (
    <>
      <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen ">
        <div className="bg-white w-52 px-4 py-2">
          <div className="relative">
            <div>Save to...</div>
            <button
              className="absolute right-0 top-0"
              onClick={() => setshowmodal((prev) => !prev)}
            >
              <span>x</span>
            </button>
          </div>

          <ul className="py-2">
            {playlist.map((item) => {
              return (
                
                  <li
                    key={item.id}
                    className="flex justify-between border-b py-1"
                    onClick={async () => {
                      let playlistmsg = await playlist_video_add_call(
                        `${process.env.REACT_APP_api}/playlist/video`,
                        {
                          videoid: videoId,
                          playlistid: item.id
                        },
                        dispatch
                      );
                      const notify = () => toast.dark(playlistmsg);
                      notify();
                      setshowmodal((prev) => !prev);
                    }}
                  >
                    <span>{item.name}</span>
                    {item.videos.reduce((total, item1) => {
                      if (item1 === videoId) {
                        return <span>added</span>;
                      }
                      return total;
                    }, <i className=""></i>)}
                  </li>
                
              );
            })}
          </ul>

          <div className="">


            <div
              style={{
                
                textAlign: "center"
              }}
            >
              <div className="">Enter Playlist Name</div>

                <input
                  type="text"
                  className="border"
                  onChange={(event) => setnewplaylist(event.target.value)}
                  value={newplaylist}
                  required
                  style={{ width: "90%" }}
                />

              
              <button
                className="bg-black text-white px-2"
                onClick={async () => {
                  if (newplaylist !== "") {
                    let playlistmsg = await playlist_add_call(
                      `${process.env.REACT_APP_api}/playlist`,
                      {
                        playlistobj: {
                          id: uuid(),
                          name: newplaylist,
                          videos: []
                        }
                      },
                      dispatch
                    );
                    const notify = () => toast.dark(playlistmsg);
                    notify();
                  }
                  setshowinput(false);
                  setnewplaylist("");
                }}
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}