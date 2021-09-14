import { useLogin } from "../reducer-context/LoginContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
export function Signup() {
  let { isUserLogIn } = useLogin();
  let [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { state } = useLocation();

  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);

  async function signupHandler() {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_api}/signup`,
        { user: { userName, email, password } }
      );
      if (response.status === 200) {
        setError("");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signupHandler();
  };

  return (
    <>
       <div className="mx-auto md:w-1/3 flex flex-col w-full px-10 items-start justify-center text-white bg-black min-h-screen">
        <img src={logo} alt="logo" className="h-14" />
        <div className="text-4xl font-medium py-3">Fit Tube</div>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="py-2 flex flex-col w-full">
            <label className={`block w-full`}>User name</label>
            <input
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              placeholder="Enter your user name"
              className="w-full px-4 py-3 text-black rounded-lg my-1"
            />
          </div>
          <div className="text-xs text-gray-300 pb-2">
          User Name should contain atleast 6 characters
          </div>
          <div className="py-2 flex flex-col w-full">
            <label className={`block w-full`}>Email</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-black rounded-lg my-1"
            />
          </div>
          <div className="py-2 w-full">
            <label className={`block w-full`}>Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-black rounded-lg my-1"
            />
          </div>
          <div className="text-xs text-gray-300 pb-1">
            Password should contain atleast 6 characters
          </div>
          {error && <div className="text-red-400 w-full pt-2">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-3 rounded-lg my-4 w-full"
          >
            Sign Up
          </button>
        </form>

        <div className="pt-2">
          Already have an account?
          <Link to="/login" className="pl-1 text-blue font-medium">
            LogIn
          </Link>
        </div>
      </div>

    </>
  );
}