import About from "../components/home/AboutSection";
import Hero from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import WorkSection from "../components/home/WorkSection";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  return (
    <>
    <Hero />
    <ServicesSection />
    <WorkSection />
    <About />
    <ContactSection />
    </>
  )
}
