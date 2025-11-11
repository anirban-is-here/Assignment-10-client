import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyEnrolledCourses from "../pages/Dashboard/MyEnrolledCourses";
import MyAddedCourses from "../pages/Dashboard/MyAddedCourses";
import AddCourse from "../pages/Dashboard/AddCourse";
import DashBoard from "../pages/Dashboard/DashBoard";
import AllCourses from "../pages/AllCourses/AllCourses";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyProfile from "../pages/Dashboard/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "courses",
        element: <AllCourses></AllCourses>,
      },
      {
        path: "dashboard",
        element: <DashBoard></DashBoard>,
        children: [
          {
            path: "myEnrolledCourses",
            element: <MyEnrolledCourses></MyEnrolledCourses>,
          },
          {
            path: "myAddedCourses",
            element: <MyAddedCourses></MyAddedCourses>,
          },
          {
            index: true,
            element: <MyProfile></MyProfile>,
          },
          {
            path: "addCourse",
            element: <AddCourse></AddCourse>,
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
