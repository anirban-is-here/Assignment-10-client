import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { MdMoving } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import api from "../hooks/useAxios";
import Swal from "sweetalert2";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();

  try {
    api.get("/categories").then((res) => setCategories(res.data));
  } catch (error) {
    console.log(error)
  }
    
  

  const handleThemeToggle = (e) => {
    const theme = e.target.checked ? "nord" : "sunset";
    document.documentElement.setAttribute("data-theme", theme);
  };

  const handleLogout = () => {
    logOut()
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have logged out successfully.",
      timer: 1500,
      showConfirmButton: false,
    }).then(navigate(`/login`));
  };

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
      )}
    </>
  );

  if (loading) {
    return (
      <div className="navbar bg-base-100 px-4 shadow">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  return (
    <div className="drawer z-50 fixed">
      {/* Drawer toggle (hidden on large screens) */}
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main navbar content */}
      <div className="drawer-content flex flex-col">
        <div className="navbar glass shadow-lg px-4 lg:px-10 container mx-auto justify-between">
          {/* Mobile menu button */}
          <div className="flex-none lg:hidden">
            <label htmlFor="main-drawer" className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="text-xl border border-base-300/10 font-bold rounded-md lg:h-12 lg:w-40 flex items-center justify-center bg-base-100/10 shadow-2xl"
          >
            <span className="text-md lg:text-2xl text-secondary flex items-center">
              Next
              <span className="text-primary text-2xl">
                <MdMoving />
              </span>
              <span className="text-accent">Skill</span>
            </span>
          </Link>

          {/* Category Dropdown */}
          <div className="hidden lg:flex dropdown ring ring-base-100 bg-base-300 rounded-md text-base-content/70">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              Explore Categories
              <span className="text-2xl">
                <RiArrowDropDownLine />
              </span>
            </div>
            <ul
              tabIndex="-1"
              className="menu dropdown-content bg-base-200 rounded-box mt-4 w-52 p-2 shadow"
            >
              {categories.map((category) => (
                <li key={category}>
                  <a>{category}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex ml-10">
            <ul className="menu menu-horizontal px-1 text-lg font-semibold">
              {links}
            </ul>
          </div>

          {/* Search Bar */}
          <label className="hidden lg:flex input input-primary items-center gap-2">
            <svg
              className="h-5 opacity-50"
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
              placeholder="What do you want to learn today.."
              className="grow"
            />
          </label>

          {/* Profile or Login/Register */}
          {user ? (
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 ring ring-primary rounded-full overflow-hidden">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="swap swap-rotate border">
                <input type="checkbox" onChange={handleThemeToggle} />
                <svg
                  className="swap-off h-8 w-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Z" />
                </svg>
                <svg
                  className="swap-on h-8 w-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49,8.59,8.59,0,0,1,9.33,3.5a1,1,0,0,0-1.33-1.14A10.15,10.15,0,1,0,22,14.05a1,1,0,0,0-.36-1Z" />
                </svg>
              </label>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="btn btn-primary btn-sm lg:btn-md">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-secondary btn-sm lg:btn-md hidden lg:flex"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Drawer Side (Mobile menu) */}
      <div className="drawer-side z-40">
        {/* DaisyUI built-in backdrop */}
        <label
          htmlFor="main-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex flex-col bg-base-100 text-base-content w-64 min-h-full p-6 text-lg font-semibold border">
          <div className="mb-6 flex items-center justify-center">
            <span className="font-bold text-2xl text-secondary flex">
              Next
              <span className="text-primary text-2xl">
                <MdMoving />
              </span>
              <span className="text-accent">Skill</span>
            </span>
          </div>

          <ul className="menu grow">{links}</ul>

          {user && (
            <div className="mt-auto pt-6 border-t border-base-300">
              <button
                onClick={handleLogout}
                className="btn btn-error w-full text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
