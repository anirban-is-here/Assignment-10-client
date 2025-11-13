import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../hooks/useAxios";
import CourseCard from "../../components/CourseCard";

const PopularCourses = () => {
  const [featured, setFeatured] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    api.get("/courses/featured").then((res) => setFeatured(res.data));
  }, []);

  return (
    <section className=" py-12 md:py-16 px-4 md:px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Popular Courses</h2>

      <div
        className="overflow-x-auto no-scrollbar relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6 w-max"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: "grabbing" }}
          animate={
            !isMobile
              ? isHovered
                ? { x: 0 }
                : { x: ["0%", "-50%"] }
              : undefined
          }
          transition={
            !isMobile
              ? { repeat: Infinity, duration: 60, ease: "linear" }
              : undefined
          }
        >
          {featured.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCourses;
