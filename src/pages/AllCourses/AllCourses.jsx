import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import CourseCard from "../../components/CourseCard";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios.get("https://next-skill-server.vercel.app/courses").then((res) => {
      setCourses(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <span className="loading loading-spinner text-error ml-4"></span>;
  }
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl font-bold text-primary my-5">
        All Courses
      </h1>
      <div className="m-7 grid grid-cols-3 gap-y-10 border pl-20">
        {courses.map((course) => (
          <CourseCard course={course} id={course.id}></CourseCard>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
