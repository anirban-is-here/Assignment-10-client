import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div className="">
        <Navbar></Navbar>
        <div className="container mx-auto">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
