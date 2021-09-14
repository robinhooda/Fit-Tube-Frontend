import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import {MdPerson} from "react-icons/md"
export function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between p-3 sticky top-0 bg-black text-white z-10">
        <Link to="/" className="flex">
          <img src={logo} alt="logo" className="w-7 h-7"/>
          <span className="pl-5 text-xl font-medium">Fit-tube</span>
        </Link>
        <div className="videonavbar-others">
          <Link to="/user">
            <MdPerson className="text-3xl"/>
          </Link>
        </div>
      </div>
    </>
  );
}