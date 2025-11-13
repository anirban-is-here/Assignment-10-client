import { useEffect, useState } from "react";
import { Link, Links, NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { MdMoving } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { RiArrowDropDownLine } from "react-icons/ri";
import api from "../hooks/useAxios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleThemeToggle = (e) => {
    const theme = e.target.checked ? "nord" : "sunset"; // or "dark"
    document.documentElement.setAttribute("data-theme", theme);
  };

  const closeDrawer = () => setOpen(!open);

  if (loading) {
    return (
      <div className="navbar bg-base-100 px-4 shadow">
        <div className="loading loading-spinner text-error"></div>
      </div>
    );
  }

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
    <div className="sticky top-0 z-50 navbar glass lg:px-10 shadow flex justify-between container mx-auto">
      <button
        className="btn btn-xs btn-ghost lg:hidden"
        onClick={() => setOpen(true)}
      >
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
      <Link
        to={"/"}
        className="text-xl border border-base-300/10 font-bold rounded-md lg:h-12 lg:w-40 justify-center flex items-center bg-base-100/10 shadow-2xl"
      >
        <span
          className="text-md lg:font-bold lg:text-2xl text-secondary flex"
          ticky
          top-0
          z-50
          shadow-md
        >
          Next
          <span className="text-xl lg:text-3xl text-primary">
            <MdMoving />
          </span>
          <span className="text-accent">Skill</span>
        </span>
      </Link>

      <div className="hidden lg:flex dropdown ring ring-base-100 bg-base-300 rounded-md text-base-content/70">
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
          {categories.map((category) => (
            <li>
              <a>{category}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden lg:flex ml-10 text-primary">
        <ul className="menu menu-horizontal px-1 text-xl text-base-content/70 font-bold ">
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
        <input
          type="search"
          required
          placeholder="What do you want to learn today.."
        />
      </label>

      {/* PROFILE IMAGE */}
      {user ? (
        <div className="flex gap-5 ">
          <div className=" w-10 h-10 ring ring-primary rounded-full">
            <img
              className="rounded-full"
              src={user.photoURL || <p>photo</p>}
              alt="profile"
            />
          </div>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleThemeToggle}
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
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
        className={`fixed top-0 left-0 h-full w-64 glass shadow z-40 transform transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4">
          {/* ---- HEADER / LOGO ---- */}
          <div className="mb-4 md:mb-0 flex items-center justify-center">
            <span className="font-bold text-xl text-secondary flex">
              Next
              <span className="text-primary text-xl">
                <MdMoving />
              </span>
              <span className="text-accent">Skill</span>
            </span>
          </div>

          {/* ---- NAVIGATION ---- */}

          <ul className="menu">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
