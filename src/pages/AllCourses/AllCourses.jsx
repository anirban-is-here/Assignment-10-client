import React, { useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import CourseCard from "../../components/CourseCard";
import api from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    setLoading(true);
    api.get("/courses").then((res) => {
      setCourses(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <span className="loading loading-spinner text-error ml-4"></span>;
  }
  return (
    <div className="min-h-vh bg-base-100">
      <h1 className="text-center text-3xl font-bold text-primary mt-7">
        All Courses
      </h1>
      <div className="grid grid-cols-4 gap-10 p-15 ">
        {courses.map((course) => (
          <CourseCard course={course} id={course.id}></CourseCard>
        ))}
      </div>    
    </div>
  );
};

export default AllCourses;
