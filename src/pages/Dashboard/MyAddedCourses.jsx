import React, { useEffect, useState } from "react";
import api from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const MyAddedCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [saving, setSaving] = useState(false);

  // fetch my added courses
  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);
    api
      .get("/courses", { params: { instructorId: user.uid } })
      .then((res) => {
        setMyCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch courses:", error);
        setLoading(false);
      });
  }, [user?.uid]);

  const onDelete = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      setMyCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const onEdit = (course) => {
    setEditCourse(course);
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editCourse) return;

    setSaving(true);
    try {
      const { _id, ...data } = editCourse;
      await api.put(`/courses/${_id}`, data).Swal.fire({
        icon: "success",
        title: "Logged out!",
        text: "Updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Update local state
      setMyCourses((prev) =>
        prev.map((c) => (c._id === _id ? { ...c, ...data } : c))
      );

      setIsModalOpen(false);
      setEditCourse(null);
    } catch (error) {
      console.error("Failed to update course:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="px-4 sm:p-6 h-full w-full rounded-lg shadow-2xl mt-20">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:my-10 text-center text-primary">
        My Created Courses
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full min-w-[800px] ring ring-gray-300 sm:min-w-full">
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

      {/* Edit Modal */}
      {isModalOpen && editCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-200 p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-primary">Edit Course</h3>
            <form className="space-y-3" onSubmit={handleSave}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editCourse.title || ""}
                onChange={handleModalChange}
                className="input w-full"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={editCourse.imageUrl || ""}
                onChange={handleModalChange}
                className="input w-full"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={editCourse.price || ""}
                onChange={handleModalChange}
                className="input w-full"
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={editCourse.duration || ""}
                onChange={handleModalChange}
                className="input w-full"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={editCourse.category || ""}
                onChange={handleModalChange}
                className="input w-full"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editCourse.description || ""}
                onChange={handleModalChange}
                className="textarea w-full"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={editCourse.isFeatured || false}
                  onChange={handleModalChange}
                  className="checkbox"
                />
                Featured
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedCourses;
