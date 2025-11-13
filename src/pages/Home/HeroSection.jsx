import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="glass text-primary py-16 md:py-32 px-4 lg:m-5 rounded-lg shadow-md shadow-secondary md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Master New Skills, Transform{" "}
            <span className="text-secondary">Your Future</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/90">
            Join thousands of learners and master new skills with top
            instructors and hands-on courses.
          </p>

          <div className="flex gap-4">
            <Link to="/courses" className="btn btn-primary btn-lg">
              Browse Courses
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Start Free
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 hidden md:flex justify-center">
          <img
            src="https://i.ibb.co.com/8gGzcKZv/open-laptop-desk-online-study-screen.jpg"
            alt="Learning Banner"
            className="w-3/4 rounded-xl animate-fade-in"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
