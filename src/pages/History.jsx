import { useReduce } from "../reducer-context/Reducer-context";
import noHistory from "../assets/empty.svg";
import { getSortedData, getFilteredData } from "../App";
import { Navigator, Navbar } from "../components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  history_video_add_call,
  history_video_delete_call
} from "../api/serverRequests";

export function History() {
  useEffect(() => {
    dispatch({ type: "CLEAR_FILTER" });
  }, []);

  const { history, dispatch, sortBy, data, showCategory } = useReduce();

  const historydata = history.map((eachitem) => {
    let finddata = data.find((item) => item.id === eachitem.historyId);
    if (finddata) {
      return { ...finddata, lastseen: eachitem.lastseen };
    }
    return {};
  });

  let sortedData = getSortedData(historydata, sortBy);
  let filteredData = getFilteredData(sortedData, { showCategory });

  function History() {
    return filteredData
      .filter((item) => item.ishistory !== false)
      .map((item) => {
        return (
          
            <div key={item.id} className="history-card pl-12 flex justify-between items-center pt-2">
              <Link to={`/video/${item.id}`}>
                <div
                  className="history-card-data"
                  onClick={() => {
                    history_video_add_call(
                      `/history/`,
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
                  <div className="history-card-desc">{item.title}</div>
                  
                </div>
              </Link>
              <button
                className="icon-button lg"
                onClick={async () => {
                  let historymsg = await history_video_delete_call(
                    `${process.env.REACT_APP_api}/history/`,
                    { historyId: item.id },
                    dispatch
                  );
                  const notify = () => toast.dark(historymsg);
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
      <Navigator value="history" />

      <div className="wrapper historywrapper">
        <div className="pl-12">History</div>
        {History().length === 0 ? (
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
            <img src={noHistory} style={{borderRadius:"5%"}}/>
            You Haven't Watched Any Video
          </div>
        ) : (
          History()
        )}
      </div>
    </>
  );
}