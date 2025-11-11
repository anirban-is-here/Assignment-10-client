import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-base-300/10 shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center md:text-left">
            Dashboard
          </h1>
          <ul className="flex flex-col gap-3">
            {[
              { name: "My Profile" },
              { name: "My Enrolled Courses", path: "myEnrolledCourses" },
              { name: "My Added Courses", path: "myAddedCourses" },
              { name: "Add Course", path: "addCourse" },

              { name: "Logout", path: "logout" },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block w-full text-lg md:text-xl px-4 py-3 rounded-lg font-semibold transition-colors duration-200
                ${
                  isActive
                    ? "text-primary-content bg-primary/80 "
                    : "text-base-content hover:ring ring-primary hover:bg-secondary/70"
                }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
