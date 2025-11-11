import {  useState } from "react";
import { Link, Links, NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { MdMoving } from "react-icons/md";
import useAuth from "../hooks/useAuth";

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
    <div className="sticky top-0 z-50 navbar bg-base-300 px-10 shadow-xl flex justify-between container mx-auto ">
      {/* LEFT - HAMBURGER FOR MOBILE */}
      <button className="btn btn-ghost lg:hidden" onClick={() => setOpen(true)}>
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
      <a className="text-xl font-bold">
        <span
          className="font-bold text-2xl text-secondary flex"
          ticky
          top-0
          z-50
          shadow-md
        >
          Next
          <span className="text-3xl text-primary">
            <MdMoving />
          </span>
          <span className="text-accent">Skill</span>
        </span>
      </a>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden lg:flex ml-10 text-orimary">
        <ul className="menu menu-horizontal px-1 text-xl text-base-content/70 font-bold">
          {links}
        </ul>
      </div>

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

          <Link to="/register" className="btn btn-secondary">
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
