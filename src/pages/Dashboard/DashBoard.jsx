import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import MyProfile from "./MyProfile";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const DashBoard = () => {
  const { user, loading, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have logged out successfully.",
      timer: 1500,
      showConfirmButton: false,
    }).then(Navigate(`/login`));

  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-base-300/10 shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold mb-8 text-center md:text-left">
            Dashboard
          </h1>
          <ul className="flex flex-col gap-3">
            {[
              { name: "Profile", path: "myProfile" },
              { name: "My Enrolled Course", path: "myEnrolledCourses" },

              { name: "My Added Courses", path: "myAddedCourses" },
              { name: "Create New Course", path: "addCourse" },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block w-full text-lg md:text-xl px-4 py-3 rounded-lg font-semibold transition-colors duration-200
                ${
                  isActive
                    ? "text-primary-content bg-primary/80 "
                    : "text-base-content hover:ring ring-primary hover:bg-base-100/70"
                }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="btn bg-base-100 btn-xl m-3 ring"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="w-full">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashBoard;
