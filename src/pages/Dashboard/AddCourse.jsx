import { useState } from "react";
import api from "../../hooks/useAxios";
import { AuthContext } from "../../Contexts/AuthContext";
import useAuth from "../../hooks/useAuth";

const AddCourse = () => {
  const { user, setLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    price: 0,
    duration: "",
    category: "",
    description: "",

    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        instructorId: user?.uid,
      };
      const res = await api.post("/courses", payload);
      console.log("course submitted", res.data);

      // save to database

      setFormData({
        title: "",
        imageUrl: "",
        price: 0,
        duration: "",
        category: "",
        description: "",
        isFeatured: false,
      });
    } catch (error) {
      console.log("error adding course", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border w-full p-8 rounded bg-base-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add a New Course
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 "
      >
        {/* Left column */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="label  text-base-content">
              <span className="label-text">Course Title</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              placeholder="e.g., Complete React Bootcamp"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text text-base-content">Image URL</span>
            </label>
            <input
              type="text"
              name="imageUrl"
              className="input input-bordered w-full"
              placeholder="e.g., https://example.com/course-image.png"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="label  text-base-content">
              <span className="label-text">Price ($)</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 49.99"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Duration */}
          <div>
            <label className="label text-base-content">
              <span className="label-text">Duration (weeks)</span>
            </label>
            <input
              type="text"
              name="duration"
              className="input input-bordered w-full"
              placeholder="e.g., 6 weeks"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="label text-base-content">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              className="select select-bordered w-full"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="AI / ML">AI / ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Photography">Photography</option>
              <option value="Music">Music</option>
              <option value="Language Learning">Language Learning</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Game Development">Game Development</option>
              <option value="Blockchain">Blockchain</option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              name="isFeatured"
              className="checkbox checkbox-primary"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <span className="label-text">Mark as Featured Course</span>
          </div>
        </div>

        {/* Full width textarea */}
        <div className="md:col-span-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            rows="4"
            value={formData.description}
            placeholder="e.g., Learn React from scratch and build real projects"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Full width submit button */}
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
