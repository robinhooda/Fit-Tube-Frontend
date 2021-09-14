import axios from "axios";
import { useEffect } from "react";
import { useLogin } from "../reducer-context/LoginContext";
import { useReduce } from "../reducer-context/Reducer-context";
import { Navbar } from "../components";

export function User() {
  const { logout, isUserLogIn } = useLogin();
  const { dispatch, user } = useReduce();

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: "LOAD", payload: true });
        let response = await axios.get(
          `${process.env.REACT_APP_api}/user`
        );
        dispatch({ type: "USER", payload: response.data });
        dispatch({ type: "LOAD", payload: false });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Navbar />
      <div className="">
        <div className="">
          <div>Name: {user.name}</div>
          <div>EmailId: {user.email}</div>
        </div>

        <button
          className=""
          onClick={() => {
            logout();
            dispatch({ type: "RESET" });
          }}
        >
          logout
        </button>
      </div>
    </>
  );
}