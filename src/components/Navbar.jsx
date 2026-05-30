import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import navMenu from "../assets/nav-menu.png"
import navHistoire from "../assets/nav-histoire.png"
import navCulture from "../assets/nav-culture.png"
import navPartenaires from "../assets/nav-partenaires.png"
import navProduits from "../assets/nav-produits.png"
import navContact from "../assets/nav-contact.png"
import navMoncafe from "../assets/nav-moncafe.png"
import navPanier from "../assets/nav-panier.png"

const leftLinks = [
  { label: "Menu",       to: "/menu",        icon: navMenu,        circle: true, marginRight: "3vw" },
  { label: "Histoire",   to: "/our-story",   icon: navHistoire,    circle: false },
  { label: "Culture café", to: "/culture",   icon: navCulture,     circle: false },
  { label: "Partenaires", to: "/partenaires", icon: navPartenaires, circle: false },
]

const rightLinks = [
  { label: "Nos produits", to: "/products",  icon: navProduits,    circle: false },
  { label: "Nouveautés",   to: "/nouveaute", icon: navPartenaires, circle: false },
  { label: "Contact",      to: "/contact",   icon: navContact,     circle: false, marginRight: "2rem" },
]

// All links for the mobile menu overlay
const allMobileLinks = [
  { label: "Histoire",    to: "/our-story"   },
  { label: "Culture café", to: "/culture"    },
  { label: "Partenaires", to: "/partenaires" },
  { label: "Nos produits", to: "/products"   },
  { label: "Nouveautés",  to: "/nouveaute"   },
  { label: "Contact",     to: "/contact"     },
  { label: "Mon café",    to: "/mon-cafe"    },
  { label: "Panier",      to: "/panier"      },
]

// ─────────────────────────────────────────────
// NAVICON — desktop only
// ─────────────────────────────────────────────
function NavIcon({ label, to, icon, circle, marginRight }) {
  return (
    <Link to={to} className="group" style={{
      marginRight: marginRight || 0,
      position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {circle ? (
        <div className="rounded-full border border-stone-600/40 flex items-center justify-center group-hover:border-amber-700/60 transition-all duration-300"
          style={{ width: "2.5rem", height: "2.5rem", background: "rgba(70,30,5,0.15)", backdropFilter: "blur(8px)" }}>
          <img src={icon} alt={label} style={{ width: "2rem", height: "1.5rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
      ) : (
        <div style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={icon} alt={label} style={{ width: "2rem", height: "1.5rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
      )}
      <span className="font-mono uppercase tracking-widest text-stone-400 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ fontSize: "12px", position: "absolute", top: "2.7rem", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
        {label}
      </span>
    </Link>
  )
}

// ─────────────────────────────────────────────
// PILL ICON — desktop only
// ─────────────────────────────────────────────
function PillIcon({ label, to, icon }) {
  return (
    <div className="group" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "1.5rem", height: "2rem" }}>
      <Link to={to} className="flex items-center justify-center">
        <img src={icon} alt={label} style={{ width: "2rem", height: "1.5rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
      </Link>
      <span className="font-mono uppercase tracking-widest text-stone-400 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ fontSize: "12px", position: "absolute", top: "2.2rem", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────
// HAMBURGER ICON
// ─────────────────────────────────────────────
function Hamburger({ open, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "none", border: "none", cursor: "pointer",
      padding: "0.5rem", display: "flex", flexDirection: "column",
      gap: "5px", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        display: "block", width: "22px", height: "1.5px",
        background: "#f5f0e8",
        transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
        transition: "transform 0.3s ease",
      }} />
      <span style={{
        display: "block", width: "22px", height: "1.5px",
        background: "#f5f0e8",
        opacity: open ? 0 : 1,
        transition: "opacity 0.3s ease",
      }} />
      <span style={{
        display: "block", width: "22px", height: "1.5px",
        background: "#f5f0e8",
        transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
        transition: "transform 0.3s ease",
      }} />
    </button>
  )
}

// ─────────────────────────────────────────────
// MOBILE MENU OVERLAY
// ─────────────────────────────────────────────
function MobileMenu({ open, onClose, lang, setLang }) {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(2,1,0,0.97)",
      backdropFilter: "blur(12px)",
      zIndex: 49,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "0.25rem",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "all" : "none",
      transition: "opacity 0.35s ease",
    }}>
      {allMobileLinks.map((l, i) => (
        <Link
          key={l.label}
          to={l.to}
          onClick={onClose}
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(2rem, 8vw, 3rem)",
            color: "#f5f0e8",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#c2440f"}
          onMouseLeave={e => e.currentTarget.style.color = "#f5f0e8"}
        >
          {l.label}
        </Link>
      ))}

      {/* FR/EN in mobile menu */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
        {["FR", "EN"].map((l, i) => (
          <button key={l} onClick={() => setLang(l)} style={{
            fontFamily: "Courier New, monospace",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            background: "none", border: "none", cursor: "pointer",
            color: lang === l ? "#f59e0b" : "rgba(245,240,232,0.35)",
            transition: "color 0.3s ease",
          }}>{l}</button>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────
export default function Navbar() {
  const { pathname } = useLocation()
  const [lang,       setLang]       = useState("FR")
  const [scrolled,   setScrolled]   = useState(false)
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768)
  const [menuOpen,   setMenuOpen]   = useState(false)

  // Scroll threshold — 1px on /partenaires, 50px elsewhere
  useEffect(() => {
    const threshold = pathname === "/partenaires" ? 1 : 50
    setScrolled(window.scrollY > threshold)
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      setScrolled(false)
    }
  }, [pathname])

  // Detect mobile — updates on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50" style={{
        background: (scrolled || menuOpen) ? "rgba(2,1,0,0.85)" : "transparent",
        backdropFilter: (scrolled || menuOpen) ? "blur(5px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}>

        {/* ── MOBILE NAVBAR ── */}
        {isMobile ? (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingLeft: "1.5rem", paddingRight: "1.5rem",
            paddingTop: "1.2rem", paddingBottom: "1.2rem",
          }}>
            {/* Hamburger — left */}
            <Hamburger open={menuOpen} onClick={() => setMenuOpen(o => !o)} />

            {/* Logo — center */}
            <Link to="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: "2.2rem",
                color: "#f5f0e8",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}>
                caphein
              </span>
            </Link>

            {/* Panier — right (most useful mobile action) */}
            <Link to="/panier" style={{ display: "flex", alignItems: "center" }}>
              <img src={navPanier} alt="Panier" style={{
                width: "1.6rem", height: "1.4rem",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }} />
            </Link>
          </div>

        ) : (
          /* ── DESKTOP NAVBAR (unchanged) ── */
          <>
            {/* FR/EN SWITCHER */}
            <div className="absolute flex items-center gap-1" style={{ top: "1.8rem", right: "3.7rem" }}>
              <button onClick={() => setLang("FR")}
                className={`font-mono uppercase tracking-widest transition-colors duration-300 ${lang === "FR" ? "text-amber-500" : "text-stone-500 hover:text-amber-600"}`}
                style={{ fontSize: "13px" }}>FR</button>
              <span className="text-stone-600" style={{ fontSize: "9px" }}>/</span>
              <button onClick={() => setLang("EN")}
                className={`font-mono uppercase tracking-widest transition-colors duration-300 ${lang === "EN" ? "text-amber-500" : "text-stone-500 hover:text-amber-600"}`}
                style={{ fontSize: "13px" }}>EN</button>
            </div>

            {/* MAIN ROW */}
            <div className="w-full flex items-center justify-between" style={{
              paddingLeft: "2.5rem", paddingRight: "2.5rem",
              paddingTop: "1.5rem",  paddingBottom: "1.5rem",
            }}>
              {/* LEFT ICONS */}
              <div className="flex items-center flex-1" style={{ gap: "2vw" }}>
                {leftLinks.map(l => <NavIcon key={l.label} {...l} />)}
              </div>

              {/* CENTER LOGO */}
              <Link to="/" style={{ fontFamily: "'Bodoni Moda', serif", transform: "translateY(-0.5rem)" }}>
                <span style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: "clamp(4rem, 5.5vw, 5.5rem)",
                  color: "#f5f0e8", fontWeight: 700, letterSpacing: "-0.02em",
                }}>caphein</span>
              </Link>

              {/* RIGHT ICONS */}
              <div className="flex items-center flex-1 justify-end" style={{ gap: "2vw" }}>
                {rightLinks.map(l => <NavIcon key={l.label} {...l} />)}
                <div className="flex items-center border border-stone-600/40 rounded-full" style={{
                  background: "rgba(70,30,5,0.15)", backdropFilter: "blur(8px)",
                  gap: "0.8rem", paddingLeft: "0.7rem", paddingRight: "0.7rem",
                  paddingTop: "0.2rem", paddingBottom: "0.2rem",
                }}>
                  <PillIcon label="Mon café" to="/mon-cafe" icon={navMoncafe} />
                  <PillIcon label="Panier"   to="/panier"   icon={navPanier}  />
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Mobile menu overlay — outside nav so it covers full screen */}
      {isMobile && (
        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          lang={lang}
          setLang={setLang}
        />
      )}
    </>
  )
}
