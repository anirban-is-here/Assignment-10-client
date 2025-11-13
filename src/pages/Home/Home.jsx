import HeroSection from "./HeroSection";
import PopularCourses from "./PopularCourses";
import WhyChooseUs from "./WhyChooseUs";
import TopInstructors from "./TopInstructors";

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <PopularCourses />
      <WhyChooseUs />
      <TopInstructors />
    </div>
  );
};

export default Home;
