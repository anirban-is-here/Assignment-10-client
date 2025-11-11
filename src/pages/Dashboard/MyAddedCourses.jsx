import React, { useEffect, useState } from "react";
import api from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const MyAddedCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const { user, loading, setLoading } = useAuth();

  // fetch my added courses
  useEffect(() => {
    if (!user?.uid) return;
    setLoading(true);

    api
      .get("/courses", {
        params: { instructorId: user.uid },
      })
      .then((res) => {
        setMyCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user?.uid]);
    
    const onDelete = (id) => {
        api.delete(`/courses/${id}`)
    }

    const onEdit = ( course ) => {
        
        console.log(course)
    }
    
  console.log(myCourses);

  if (loading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  return (
    <div className="px-4 sm:p-6 h-full w-full rounded-lg shadow-2xl">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:my-10 text-center text-primary">
        My Created Courses
      </h2>

      <div className="">
        <table className="table w-full min-w-[800px] ring ring-gray-300 sm:min-w-fu">
          <thead className="bg-base-100 text-primary text-sm sm:text-lg">
            <tr>
              <th className="text-left">Title</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Duration</th>
              <th>Featured</th>
              <th>Students</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myCourses.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-lg"
                >
                  No courses found.
                </td>
              </tr>
            ) : (
              myCourses.map((course) => (
                <tr
                  key={course._id}
                  className="hover:bg-secondary bg-base-300 text-base-content text-sm sm:text-lg font-semibold hover:text-white transition duration-200"
                >
                  <td className="font-medium">{course.title}</td>
                  <td>
                    <span className="badge badge-outline text-xs sm:text-sm">
                      {course.category}
                    </span>
                  </td>
                  <td>${course.price}</td>
                  <td>{course.duration}</td>
                  <td>
                    {course.isFeatured ? (
                      <span className="badge badge-success text-xs sm:text-sm">
                        Yes
                      </span>
                    ) : (
                      <span className="badge badge-ghost text-xs sm:text-sm">
                        No
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {course.enrolledStudents?.length || 0}
                    </span>
                  </td>
                  <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(course.updatedAt).toLocaleDateString()}</td>
                  <td className="space-x-1 sm:space-x-2 flex flex-wrap gap-1">
                    <button
                      className="btn btn-sm btn-warning text-xs sm:text-sm"
                      onClick={() => onEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error text-xs sm:text-sm"
                      onClick={() => onDelete(course._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAddedCourses;
