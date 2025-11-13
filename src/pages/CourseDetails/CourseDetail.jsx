import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CourseDetail = () => {
  const { _id } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${_id}`);
        setCourse(res.data);
        if (res.data.enrolledStudents?.includes(user?.uid)) {
          setIsEnrolled(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [_id, user, isEnrolled]);

  console.log(course);

  const handleEnroll = async () => {
    if (!user) return Swal.fire("Please log in to enroll.");

    setLoading(true);
    try {
      const res = await api.post(`/courses/${_id}/enroll`, {
        userId: user.uid,
      });

      Swal.fire({
        icon: "success",
        title: "Enrollment Successful!",
      });

      if (res.data.course) setCourse(res.data.course);
      setIsEnrolled(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to enroll.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!course)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Course Card */}
      <div className="grid md:grid-cols-2 gap-8  p-8 rounded-2xl shadow-xl">
        <div className="glass p-5 rounded-lg">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="rounded-xl w-full h-[350px] object-cover shadow-md"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-3">
              {course.title}
            </h1>
            <p className="text-base text-base-content/70 mb-4">
              Category: <span className="font-semibold">{course.category}</span>
            </p>
            <p className="text-xl font-semibold mb-1">
              Price: ${course.price?.toFixed(2)}
            </p>
            <p className="text-md text-gray-500 mb-4">
              Duration: {course.duration}
            </p>
            <p className="mb-6 leading-relaxed">{course.description}</p>
          </div>

          {/* Enrollment button */}
          {user?.uid === course.instructorId ? (
            <Link
              to="/dashboard/myAddedCourses"
              className="btn btn-primary w-full"
            >
              Manage Your Courses
            </Link>
          ) : isEnrolled ? (
            <Link
              to="/dashboard/myEnrolledCourses"
              className="btn btn-accent w-full"
            >
              Go to My Enrolled Courses
            </Link>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Enrolling..." : "Enroll Now"}
            </button>
          )}
        </div>
      </div>

      {/* Instructor Section */}

      <div className="mt-12 bg-base-200 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Instructor</h2>
        <div className="flex items-center gap-6">
          <img
            src={course?.instructorId?.image}
            alt={course?.instructorId?.name}
            className="w-20 h-20 rounded-full border-4 border-primary object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">
              {course?.instructorId?.name}
            </h3>
            <p className="text-gray-500">{course?.instructor?.email}</p>
          </div>
        </div>
      </div>

      {/* Enrolled Students Section */}
      <div className="mt-12 bg-base-200 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          Enrolled Students
        </h2>

        {course?.students?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {course.students.map((student) => (
              <div
                key={student._id}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-16 h-16 rounded-full border border-primary shadow"
                />
                <p className="mt-2 text-sm font-semibold">{student.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No students enrolled yet.</p>
        )}
      </div>

      {/* Meta Info */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-1">Created At</h3>
          <p>{new Date(course.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-1">Last Updated</h3>
          <p>
            {course.updatedAt
              ? new Date(course.updatedAt).toLocaleDateString()
              : "Not updated yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
