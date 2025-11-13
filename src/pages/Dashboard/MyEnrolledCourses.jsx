import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../hooks/useAxios";

const MyEnrolledCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return; // wait until user exists

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/users/${user.uid}/enrolled`);
        setCourses(res.data || []);
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary text-4xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        My Enrolled Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="card bg-base-200 shadow-lg rounded-lg hover:shadow-xl transition duration-300"
            >
              <figure>
                <img
                  src={course.imageUrl || "/default-course.png"}
                  alt={course.title}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-primary">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="badge badge-outline">${course.price}</span>
                  <span className="badge badge-success">{course.duration}</span>
                </div>
                <p className="mt-2 text-gray-700 text-sm">
                  Instructor: {course.instructorName || "N/A"}
                </p>
                <div className="mt-3">
                  <span
                    className={`badge ${
                      course.status === "Completed"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {course.status || "In Progress"}
                  </span>
                </div>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary btn-sm w-full">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
