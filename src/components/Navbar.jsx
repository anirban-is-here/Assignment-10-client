import {  useState } from "react";
import { Link, Links, NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { MdMoving } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  console.log(user);

  if (loading) {
    return (
      <div className="navbar bg-base-100 px-4 shadow">
        <div className="loading loading-spinner text-error"></div>
      </div>
    );
  }

  const handleLogOut = () => {
    logOut().then(console.log("logged out"));
  };

  const closeDrawer = () => setOpen(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border-b-2 border-primary"
              : "text-base-content/70 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border-b-2 border-primary"
              : "text-base-content/70 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all"
          }
        >
          All Courses
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-base-content/70 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 navbar bg-base-300 lg:px-10 shadow flex justify-between container mx-auto">
      {/* LEFT - HAMBURGER FOR MOBILE */}
      <button className="btn btn-xs btn-ghost lg:hidden" onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* LOGO */}
      <Link to={"/"} className="text-xl font-bold">
        <span
          className="text-md lg:font-bold lg:text-2xl text-secondary flex"
          ticky
          top-0
          z-50
          shadow-md
        >
          Next
          <span className="lg:text-3xl text-primary">
            <MdMoving />
          </span>
          <span className="text-accent">Skill</span>
        </span>
      </Link>

      <div className="hidden lg:flex dropdown ring ring-base-100 bg-base-300">
        <div tabIndex={0} role="button" className="btn btn-ghost ">
          Explore Categories
          <span className="text-2xl">
            <RiArrowDropDownLine />
          </span>
        </div>
        <ul
          tabIndex="-1"
          className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden lg:flex ml-10 text-primary">
        <ul className="menu menu-horizontal px-1 text-xl text-base-content/70 font-bold">
          {links}
        </ul>
      </div>

      <label className=" hidden lg:flex input input-primary">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="What do you want to learn today.." />
      </label>

      {/* PROFILE IMAGE */}
      {user ? (
        <div className="flex gap-5 ">
          <div className=" w-10 h-10">
            <img
              className="rounded-full"
              src={user.photoURL || <p>photo</p>}
              alt="profile"
            />
          </div>
          <Link onClick={handleLogOut} className="btn btn-primary bg-error">
            Logout
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>

          <Link to="/register" className="btn btn-secondary hidden lg:flex">
            Register
          </Link>
        </div>
      )}

      {/* BACKDROP (appears when drawer is open) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={closeDrawer}
        ></div>
      )}

      {/* LEFT DRAWER (mobile only) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4">
          {/* Drawer Logo */}
          <div className="mb-4 md:mb-0 flex items-center justify-center ">
            <span className="font-bold text-xl text-secondary flex">
              Next
              <span className="text-xl text-primary">
                <MdMoving />
              </span>
              <span className="text-accent">Skill</span>
            </span>
          </div>

          {/* Drawer nav items */}
          <ul className="menu">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
