import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex">
      <aside className="w-1/5 py-10 items-center bg-accent-content border">
        <h1 className="text-xl ml-5 mb-15 font-bold text-warning">Dashboard</h1>
        <ul className="flex flex-col justify-center ">
          <li className="">
            <NavLink
              to="myEnrolledCourses"
              className={({ isActive }) =>
                `btn btn-ghost justify-start text-xl w-full py-10 text-warning ${
                  isActive ? "bg-primary text-white " : ""
                }`
              }
            >
              My Enrolled Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="myAddedCourses"
              className={({ isActive }) =>
                `btn btn-ghost justify-start text-xl w-full py-10 text-warning ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              My Added Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addCourse"
              className={({ isActive }) =>
                `btn btn-ghost justify-start text-xl w-full py-10 text-warning ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              Add Course
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `btn btn-ghost justify-start text-xl w-full py-10 text-warning ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="logout"
              className={({ isActive }) =>
                `btn btn-ghost justify-start text-xl w-full py-10 text-warning ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="border w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
