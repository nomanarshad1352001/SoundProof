import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Brands from "./components/Brands";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Footer from "./components/Footer";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-signal"
      style={{ scaleX }}
    />
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-void font-body text-bone">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Brands />
        <About />
        <Gallery />
        <Location />
      </main>
      <Footer />
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
