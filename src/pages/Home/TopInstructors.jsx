const TopInstructors = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Top Instructors</h2>

      <div className="flex overflow-x-auto no-scrollbar gap-6 pb-4">
        <div className="card w-64 flex-shrink-0 bg-base-100 shadow hover:scale-105 transition">
          <figure>
            <img
              src="/instructor-1.jpg"
              alt="Instructor"
              className="rounded-t-lg"
            />
          </figure>
          <div className="card-body text-center">
            <h3 className="card-title">John Doe</h3>
            <p className="text-gray-600">Web Development</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopInstructors;
