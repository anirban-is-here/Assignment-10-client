import { motion } from "framer-motion";
import { useState } from "react";

const WhyChooseUs = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const features = [
    {
      icon: "🎓",
      title: "Expert Instructors",
      desc: "Learn from educators with real-world experience.",
    },
    {
      icon: "💻",
      title: "Hands-On Projects",
      desc: "Build real projects to strengthen your portfolio.",
    },
    {
      icon: "🏆",
      title: "Certification",
      desc: "Earn certificates and showcase your achievements.",
    },
  ];

  return (
    <section className="bg-base-200 py-12 md:py-16 px-4 md:px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>

      <div
        className="overflow-x-auto no-scrollbar relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6 w-max"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: "grabbing" }}
          animate={
            !isMobile
              ? isHovered
                ? { x: 0 }
                : { x: ["0%", "-25%"] }
              : undefined
          }
          transition={
            !isMobile
              ? { repeat: Infinity, duration: 80, ease: "linear" }
              : undefined
          }
        >
          {features.map((item) => (
            <div
              key={item.title}
              className="p-8 bg-base-100 rounded-lg shadow hover:scale-105 transition flex-shrink-0 w-72"
            >
              <div className="text-5xl text-primary mb-4">{item.icon}</div>
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
