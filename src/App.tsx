import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/Home"
import LeadModal from "./components/LeadForm"// Import your new Modal

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScrolledTriggered, setHasScrolledTriggered] = useState(false);

  // Function to open modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Logic: Trigger modal automatically after scrolling 800px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800 && !hasScrolledTriggered) {
        setIsModalOpen(true);
        setHasScrolledTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolledTriggered]);

  return (
    <div className="relative">
      {/* 1. Pass openModal to Navbar for the 'Reach Us' button */}
      <Navbar onContactClick={openModal} />

      <Routes>
        {/* 2. Pass openModal to Home so the Hero section can use it */}
        <Route path="/" element={<Home onContactClick={openModal} />} />
      </Routes>

      <Footer />

      {/* 3. The Modal lives here at the root level */}
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default App