import React, { useEffect, useState } from "react";
import api from "../../hooks/useAxios";
import CourseCard from "../../components/CourseCard";
import { motion } from "framer-motion";


const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    try {
      api.get("/courses/featured").then((res) => {
        setFeatured(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="w-full">
      {/* ✅ HERO / BANNER SECTION */}
      <section className="glass text-primary py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Master New Skills Transform{" "}
              <span className="text-secondary">Your Future</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/90">
              Join thousands of learners and master new skills with top
              instructors and hands-on courses.
            </p>

            <div className="flex gap-4">
              <button className="btn btn-primary btn-lg">Browse Courses</button>
              <button className="btn btn-outline btn-lg">Start Free</button>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="flex-1 hidden md:flex justify-center">
            <img
              src="https://i.ibb.co.com/8gGzcKZv/open-laptop-desk-online-study-screen.jpg"
              alt="Learning Banner"
              className="w-3/4 animate-fade-in"
            />
          </div>
        </div>
      </section>

      {/* ✅ POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Courses
        </h2>

        <motion.div
          className="flex gap-6 w-max"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }} // Adjust according to content width
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: "grabbing" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {featured.map((course) => (
            <CourseCard course={course}></CourseCard>
          ))}
          {/* <CourseCard /> component will go here */}
        </motion.div>
      </section>

      {/* ✅ WHY CHOOSE US SECTION */}
      <section className="bg-base-200 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-base-100 rounded-lg shadow hover:scale-105 transition">
            <div className="text-5xl text-primary mb-4">🎓</div>
            <h3 className="font-semibold text-xl">Expert Instructors</h3>
            <p className="text-gray-600 mt-2">
              Learn from educators with real-world experience.
            </p>
          </div>

          <div className="p-8 bg-base-100 rounded-lg shadow hover:scale-105 transition">
            <div className="text-5xl text-primary mb-4">💻</div>
            <h3 className="font-semibold text-xl">Hands-On Projects</h3>
            <p className="text-gray-600 mt-2">
              Build real projects to strengthen your portfolio.
            </p>
          </div>

          <div className="p-8 bg-base-100 rounded-lg shadow hover:scale-105 transition">
            <div className="text-5xl text-primary mb-4">🏆</div>
            <h3 className="font-semibold text-xl">Certification</h3>
            <p className="text-gray-600 mt-2">
              Earn certificates and showcase your achievements.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ TOP INSTRUCTORS SECTION */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Top Instructors
        </h2>

        <div className="flex overflow-x-auto gap-6 pb-4">
          {/* Replace with .map() after fetching instructors */}
          <div className="card w-64 flex shrink-0 bg-base-100 shadow hover:scale-105 transition">
            <figure>
              <img
                src="/instructor-1.jpg"
                alt="Instructor"
                className="rounded-t-lg"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="card-title">John Doe</h3>
              <p className="text-gray-600">Web Development</p>
            </div>
          </div>

          {/* More instructor cards... */}
        </div>
      </section>
    </div>
  );
};

export default Home;
