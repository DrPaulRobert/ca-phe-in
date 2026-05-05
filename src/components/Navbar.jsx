import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import navMenu from "../assets/nav-menu.png"
import navHistoire from "../assets/nav-histoire.png"
import navCulture from "../assets/nav-culture.png"
import navPartenaires from "../assets/nav-partenaires.png"
import navProduits from "../assets/nav-produits.png"
import navContact from "../assets/nav-contact.png"
import navMoncafe from "../assets/nav-moncafe.png"
import navPanier from "../assets/nav-panier.png"

const leftLinks = [
  { label: "Menu", to: "/menu", icon: navMenu, circle: true, marginRight: "3vw" },
  { label: "Histoire", to: "/our-story", icon: navHistoire, circle: false },
  { label: "Culture café", to: "/culture", icon: navCulture, circle: false },
  { label: "Partenaires", to: "/partenaires", icon: navPartenaires, circle: false },
]

const rightLinks = [
  { label: "Nos produits", to: "/products", icon: navProduits, circle: false },
  { label: "Nouveautés", to: "/nouveaute", icon: navPartenaires, circle: false },  
  { label: "Contact", to: "/contact", icon: navContact, circle: false, marginRight: "2rem" },
]

// ─────────────────────────────────────────────
// NAVICON COMPONENT
// ─────────────────────────────────────────────
function NavIcon({ label, to, icon, circle, marginRight }) {
  return (
    <Link
      to={to}
      className="group"
      style={{
        marginRight: marginRight || 0,
        position: "relative",        // needed for absolute label positioning
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ICON — with or without circle */}
      {circle ? (
        <div
          className="rounded-full border border-stone-600/40 flex items-center justify-center group-hover:border-amber-700/60 transition-all duration-300"
          style={{
            width: "2.5rem",          // ← circle width
            height: "2.5rem",         // ← circle height
            background: "rgba(70,30,5,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <img src={icon} alt={label} style={{
            width: "2rem",          // ← icon size inside circle    IN CIRCLE
            height: "1.5rem",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }} />
        </div>
      ) : (
        <div style={{
          width: "2.5rem",            // ← icon area width (keep equal to circle for alignment)
          height: "2.5rem",           // ← icon area height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img src={icon} alt={label} style={{
            width: "2rem",          // ← icon size without circle   OUT CIRCLE
            height: "1.5rem",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }} />
        </div>
      )}

      {/* LABEL — absolute so it never affects icon alignment */}
      <span
        className="font-mono uppercase tracking-widest text-stone-400 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          fontSize: "12px",            // ← label text size
          position: "absolute",       // does not push icons around
          top: "2.7rem",              // ← vertical distance from top of icon — adjust if misaligned
          left: "50%",
          transform: "translateX(-50%)",  // centers text under the icon
          whiteSpace: "nowrap",       // prevents text from wrapping
        }}
      >
        {label}
      </span>
    </Link>
  )
}

// ─────────────────────────────────────────────
// PILL ICON — for Mon café and Panier
// Same absolute label logic, individual hover per icon
// ─────────────────────────────────────────────
function PillIcon({ label, to, icon }) {
  return (
    <div
      className="group"
      style={{
        position: "relative",         // needed for absolute label
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.5rem",                // ← clickable area width inside pill
        height: "2rem",               // ← clickable area height inside pill
      }}
    >
      <Link to={to} className="flex items-center justify-center">
        <img src={icon} alt={label} style={{
          width: "2rem",            // ← icon size inside pill
          height: "1.5rem",           // ← icon size inside pill            PILL
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }} />
      </Link>

      {/* LABEL — appears below pill on hover, centered under each icon */}
      <span
        className="font-mono uppercase tracking-widest text-stone-400 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          fontSize: "12px",            // ← Mon café / Panier label text size
          position: "absolute",
          top: "2.2rem",              // ← distance below the icon — adjust if misaligned
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────
export default function Navbar() {
  const [lang, setLang] = useState("FR")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    // ↑ 50px scroll threshold before background appears
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: scrolled ? "rgba(2,1,0,0.85)" : "transparent",
        // ↑ 0.85 = darkness of scroll background (0 invisible → 1 fully black)
        backdropFilter: scrolled ? "blur(5px)" : "none",
        // ↑ frosted glass on scroll — remove line for plain dark background
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        // ↑ 0.4s = fade speed
      }}
    >

      {/* ── FR/EN SWITCHER ── */}
      <div
        className="absolute flex items-center gap-1"
        style={{
          top: "1.8rem",    // ← vertical position from top
          right: "3.7rem",    // ← distance from right edge (increase = more to the left)
        }}
      >
        <button
          onClick={() => setLang("FR")}
          className={`font-mono uppercase tracking-widest transition-colors duration-300 ${lang === "FR" ? "text-amber-500" : "text-stone-500 hover:text-amber-600"}`}
          style={{ fontSize: "13px" }} // FR size
        >FR</button>
        <span className="text-stone-600" style={{ fontSize: "9px" }}>/</span>
        <button
          onClick={() => setLang("EN")}
          className={`font-mono uppercase tracking-widest transition-colors duration-300 ${lang === "EN" ? "text-amber-500" : "text-stone-500 hover:text-amber-600"}`}
          style={{ fontSize: "13px" }} // EN size
        >EN</button>
      </div>

      {/* ── MAIN ROW ── */}
      <div
        className="w-full flex items-center justify-between"
        style={{
          paddingLeft: "2.5rem",    // ← left edge margin
          paddingRight: "2.5rem",   // ← right edge margin
          paddingTop: "1.5rem",       // ← top padding / shifts everything down          ----------------
          paddingBottom: "1.5rem",  // ← bottom padding
        }}
      >

        {/* ── LEFT ICONS ── */}
        <div
          className="flex items-center flex-1"
          style={{ gap: "2vw" }}
          // ↑ "2vw" = 2% of screen width — scales with screen size
        >
          {leftLinks.map((l) => (
            <NavIcon key={l.label} {...l} />
          ))}
        </div>

        {/* ── CENTER LOGO ── */}
        <Link
          to="/"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            transform: "translateY(-0.5rem)", // ← move logo up/down independently (negative = up)
          }}
        >
          <span style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(4rem, 5.5vw, 5.5rem)",           
            // ↑ clamp(MIN, PREFERRED, MAX) — scales between screens
            color: "#f5f0e8",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}>
            caphein
          </span>
        </Link>

        {/* ── RIGHT ICONS ── */}
        <div
          className="flex items-center flex-1 justify-end"
          style={{ gap: "2vw" }}
        >
          {rightLinks.map((l) => (
            <NavIcon key={l.label} {...l} />
          ))}

          {/* ── MON CAFE + PANIER PILL ── */}
          <div
            className="flex items-center border border-stone-600/40 rounded-full"
            style={{
              background: "rgba(70,30,5,0.15)",
              backdropFilter: "blur(8px)",
              gap: "0.8rem",          // ← space between Mon café and Panier icons
              paddingLeft: "0.7rem",    // ← pill left padding
              paddingRight: "0.7rem",   // ← pill right padding
              paddingTop: "0.2rem",   // ← pill top padding
              paddingBottom: "0.2rem",// ← pill bottom padding
            }}
          >
            <PillIcon label="Mon café" to="/mon-cafe" icon={navMoncafe} />
            <PillIcon label="Panier" to="/panier" icon={navPanier} />
          </div>
          {/* ── END PILL ── */}

        </div>

      </div>

    </nav>
  )
}