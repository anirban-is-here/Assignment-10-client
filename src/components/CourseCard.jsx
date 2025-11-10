import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CourseCard = ({ course }) => {
  const { category, duration, imageUrl, price, title } = course;
  return (
    
      <div className="card bg-base-100 w-96 shadow-sm border flex items-center p-5">
        <figure className="border h-50 w-80">
          <img src={imageUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    
  );
};

export default CourseCard;
