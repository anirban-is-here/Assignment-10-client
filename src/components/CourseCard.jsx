import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CourseCard = ({ course }) => {
  const { _id, category, duration, imageUrl, price, title } = course;

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDetails = () => {
    console.log("details clicked", user, _id);
    user ? navigate(`/courses/${_id}`) : navigate("/");
  };

  return (
    <div className="card bg-base-200 shadow-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl ring ring-base-300">
      <figure className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
          loading="lazy"
        />

        {course.isFeatured && (
          <span className="absolute top-2 left-2 badge badge-primary shadow">
            Featured
          </span>
        )}
      </figure>

      <div className="card-body space-y-2">
        <h2 className="card-title text-lg font-bold text-primary">{title}</h2>

        <p className="text-sm text-base-content/70">{category}</p>

        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-secondary">${price}</span>
          <span className="badge badge-outline">{duration}</span>
        </div>

        <div className="card-actions mt-4">
          <button
            onClick={handleDetails}
            className="btn btn-primary btn-sm w-full"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
