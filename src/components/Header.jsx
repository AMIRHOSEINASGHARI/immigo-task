import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
//assets
import logo from "../assets/npr.png";
//components
import { FaSave } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-gray-100 relative">
      <div className="py-5 px-3 flex items-center justify-between max-w-[1200px] mx-auto">
        <Link to="/">
          <img src={logo} alt="logo" className="w-20" />
        </Link>
        <div className="xxl:hidden">
          {!menuOpen ? (
            <HiMenuAlt3
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          ) : (
            <GrClose
              className="text-xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          )}
          <nav
            className={`absolute right-0 top-full bg-gray-100 z-10 p-3 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col space-y-3">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-b-blue-300 bg-blue-100 text-blue-700 px-2 py-1"
                      : "py-1 px-2"
                  }
                  to="/news"
                >
                  NPR News
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pins"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center border-b-2 border-b-blue-300 bg-blue-100 px-2 py-1 text-blue-700"
                      : "flex items-center py-1 px-2"
                  }
                >
                  <FaSave className="mr-1" />
                  Saved News
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="hidden xxl:block">
          <ul className="flex items-center space-x-5">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-b-blue-300 bg-blue-100 text-blue-700 px-2 py-1"
                    : "py-1 px-2"
                }
                to="/news"
              >
                NPR News
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pins"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center border-b-2 border-b-blue-300 bg-blue-100 px-2 py-1 text-blue-700"
                    : "flex items-center py-1 px-2"
                }
              >
                <FaSave className="mr-1" />
                Saved News
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
