import { useState } from "react"
import { Link } from "react-router-dom"

const links = [
  { label: "Our Story", to: "/our-story" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-stone-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl tracking-widest text-amber-100">
          Cà Phê In
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-stone-300 hover:text-amber-300 tracking-widest text-sm uppercase transition-colors duration-300"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-amber-100 text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-stone-950 px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-stone-300 hover:text-amber-300 tracking-widest text-sm uppercase"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}