import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import OurStory from "./pages/OurStory"
import Products from "./pages/Products"
import Services from "./pages/Services"
import Contact from "./pages/Contact"

// ─── SCROLL TO TOP ON EVERY NAVIGATION ───────────────────────────────────────
// Placed inside BrowserRouter so it can access useLocation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
