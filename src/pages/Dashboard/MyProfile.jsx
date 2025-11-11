import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Save profile data:", formData);
    // Here you can call API to update user profile
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-base-300 p-6 rounded-lg text-primary">
        <div className="">
          <div className="w-40 h-40 rounded-full ring ring-secondary ring-offset-2 overflow-hidden">
            <img
              className="w-40 h-40"
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
            />
          </div>
          <button className="btn btn-sm mt-2 btn-accent w-full">
            Change Photo
          </button>
        </div>
        <div className="flex-1 text-base-content">
          <h1 className="text-3xl font-bold">
            {user?.displayName || "Your Name"}
          </h1>
          <p className="text-lg">{user?.email}</p>
          <p className="mt-2 text-gray-200">{user?.bio || "Add your bio..."}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 bg-base-300 text-secondary rounded-lg shadow text-center">
          <p className="text-xl font-bold">{user?.coursesAdded || 0}</p>
          <p>Courses Added</p>
        </div>
        <div className="p-4 bg-base-300 text-primary rounded-lg shadow text-center">
          <p className="text-xl font-bold">{user?.coursesEnrolled || 0}</p>
          <p>Courses Enrolled</p>
        </div>
        <div className="p-4 bg-base-300 text-primary rounded-lg shadow text-center">
          <p className="text-xl font-bold">{user?.students || 0}</p>
          <p>Total Students</p>
        </div>
        <div className="p-4 bg-base-300 text-primary rounded-lg shadow text-center">
          <p className="text-xl font-bold">{user?.certificates || 0}</p>
          <p>Certificates</p>
        </div>
      </div>

      {/* Editable Info Form */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Edit Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <div className="border border-primary/50 rounded-lg">
            <input
              type="email"
              value={formData.email}
              disabled
              className="input input-bordered w-full  cursor-not-allowed "
            />
          </div>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            placeholder="Bio"
            className="textarea textarea-bordered w-full md:col-span-2"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 text-right">
          <button onClick={handleSave} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="mt-8">
        <div className="tabs tabs-boxed">
          <a className="tab tab-active">Enrolled Courses</a>
          <a className="tab">Added Courses</a>
          <a className="tab">Certificates</a>
        </div>

        <div className="mt-4">{/* Render content based on active tab */}</div>
      </div>
    </div>
  );
};

export default MyProfile;
