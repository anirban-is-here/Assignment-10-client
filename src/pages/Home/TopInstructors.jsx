const TopInstructors = () => {
  const instructors = [
    {
      name: "John Doe",
      specialization: "Web Development",
      photo: "https://i.ibb.co.com/9kZghtkj/provider2.jpg",
    },
    {
      name: "Jane Smith",
      specialization: "UI/UX Design",
      photo: "https://i.ibb.co.com/zhfZ9NW5/provider1.jpg",
    },
    {
      name: "Michael Lee",
      specialization: "Data Science",
      photo: "https://i.ibb.co.com/Q0gTjBD/provider4.jpg",  
    },
    {
      name: "Sara Williams",
      specialization: "Machine Learning",
      photo: "https://i.ibb.co.com/WNN96pZT/provider3.jpg",
    },
    
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Top Instructors</h2>

      <div className="flex overflow-x-auto no-scrollbar gap-6 pb-4">
        {instructors.map((inst, index) => (
          <div
            key={index}
            className="card w-64 shrink-0 glass shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <figure className="h-40 overflow-hidden">
              <img
                src={inst.photo}
                alt={inst.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="card-title text-lg font-semibold">{inst.name}</h3>
              <p className="text-secondary">{inst.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;
