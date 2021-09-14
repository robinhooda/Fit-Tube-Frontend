import { Routes, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReduce } from "./reducer-context/Reducer-context";
import PrivateRoute from "./PrivateRoute";
import {
  VideoBlock,
  Home,
  Playlist,
  History,
  Liked,
  Login,
  Signup,
  User,
  NotFound
} from "./pages";
export default function App() {
  const { loading } = useReduce();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoBlock />} />
        <PrivateRoute path="/playlist" element={<Playlist />} />
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/liked" element={<Liked />} />
        <PrivateRoute path="/user" element={<User />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {loading && (
        <div className="loader absolute top-1/2 left-1/3 md:left-1/2">
          <Loader
            type="ThreeDots"
            color="gray"
            // height={100}
            // width={100}
            timeout={1000000} //3 secs
          />
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
      />
    </div>
  );
}

export function getSortedData(videolist, sortBy) {
  if (sortBy === "Oldest First") {
    return [...videolist].sort(
      (a, b) => new Date(a.dateofpublish) - new Date(b.dateofpublish)
    );
  }
  if (sortBy === "Newest First") {
    return [...videolist].sort(
      (a, b) => new Date(b.dateofpublish) - new Date(a.dateofpublish)
    );
  }
  return videolist;
}

export function getFilteredData(sortedData, { showCategory }) {
  return sortedData.filter((item) =>
    showCategory.length !== 0 ? showCategory.includes(item.genre) : true
  );
}