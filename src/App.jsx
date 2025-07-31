import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import HeroSection from "./HeroSection";
import TaskBoard from "./task/TaskBoard";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col justify-center items-center">
        <HeroSection />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}

export default App;
