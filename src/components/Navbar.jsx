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
import navNouveautes from "../assets/nav-nouveautes.png"

// ─────────────────────────────────────────────────────────────────────────────
// ── LABEL POSITION & FADE SPEED ──────────────────────────────────────────────
// labelTop:  vertical distance from icon (rem) — increase = lower
// labelLeft: horizontal offset from center (px) — positive = right, negative = left
// LABEL_FADE_DURATION: fade-in speed on landing page (seconds)
// ─────────────────────────────────────────────────────────────────────────────
const LABEL_FADE_DURATION = 1.0   // ← fade-in duration in seconds
const LABEL_FADE_DELAY    = 1.5   // ← wait before fade starts (seconds)

const leftLinks = [
  { label: "Menu",         to: "/menu",        icon: navMenu,        circle: true,  marginRight: "3vw", labelTop: "2.5rem", labelLeft: 0   },
  { label: "Histoire",     to: "/our-story",   icon: navHistoire,    circle: false,  marginRight: "1vw", labelTop: "2.5rem", labelLeft: 0   },
  { label: "Culture", to: "/culture",     icon: navCulture,     circle: false,  marginRight: "1vw", labelTop: "2.5rem", labelLeft: 0   },
  { label: "Partenaires",  to: "/partenaires", icon: navPartenaires, circle: false, labelTop: "2.5rem", labelLeft: 0   },
]

const rightLinks = [
  { label: "Produits", to: "/products",  icon: navProduits,   circle: false, marginRight: "1vw", labelTop: "2.5rem", labelLeft: 0 },
  { label: "News",   to: "/nouveaute", icon: navNouveautes, circle: false, marginRight: "1vw", labelTop: "2.5rem", labelLeft: 0 },
  { label: "Contact",      to: "/contact",   icon: navContact,    circle: false,  marginRight: "2vw",  labelTop: "2.5rem", labelLeft: 0 },  
]

const pillLinks = [
  { label: "Mon café", to: "/mon-cafe", icon: navMoncafe, labelTop: "2.5rem", labelLeft: 0, hoverOnly: true },
  { label: "Panier",   to: "/panier",   icon: navPanier,  labelTop: "2.5rem", labelLeft: 0, hoverOnly: true },
]

const allMobileLinks = [
  { label: "Histoire",     to: "/our-story"   },
  { label: "Culture café", to: "/culture"     },
  { label: "Partenaires",  to: "/partenaires" },
  { label: "Nos produits", to: "/products"    },
  { label: "Nouveautés",   to: "/nouveaute"   },
  { label: "Contact",      to: "/contact"     },
  { label: "Mon café",     to: "/mon-cafe"    },
  { label: "Panier",       to: "/panier"      },
]

// Route → which label is "active"
// Uses startsWith so sub-routes also highlight the parent tab
function getActiveLabel(pathname) {
  if (pathname.startsWith("/our-story"))   return "Histoire"
  if (pathname.startsWith("/culture"))     return "Culture\ncafé"
  if (pathname.startsWith("/partenaires")) return "Partenaires"
  if (pathname.startsWith("/products"))    return "Nos produits"
  if (pathname.startsWith("/nouveaute"))   return "Nouveautés"
  if (pathname.startsWith("/contact"))     return "Contact"
  if (pathname.startsWith("/mon-cafe"))    return "Mon\ncafé"
  if (pathname.startsWith("/panier"))      return "Panier"
  return null  // landing page — no single active tab
}

function DesktopDrawer({ open, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  const links = [
    { label: "Histoire",     to: "/our-story"   },
    { label: "Culture café", to: "/culture"     },
    { label: "Partenaires",  to: "/partenaires" },
    { label: "Nos produits", to: "/products"    },
    { label: "Nouveautés",   to: "/nouveaute"   },
    { label: "Contact",      to: "/contact"     },
    { label: "Mon café",     to: "/mon-cafe"    },
    { label: "Panier",       to: "/panier"      },
  ]

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", top: "7rem", left: 0, right: 0, bottom: 0, background: "rgba(2,1,0,0.5)", backdropFilter: "blur(2px)", zIndex: 48, opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none", transition: "opacity 0.35s ease" }} />
      <div style={{ position: "fixed", top: "9rem", left: 0, bottom: 0, width: "350px", background: "rgba(2,1,0,0.97)", backdropFilter: "blur(12px)", zIndex: 49, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 3rem", transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)", borderRight: "1px solid rgba(70,30,5,0.2)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {links.map((l, i) => (
            <Link key={l.label} to={l.to} onClick={onClose} style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "var(--color-cream)", fontWeight: 700, textDecoration: "none", letterSpacing: "-0.01em", lineHeight: 1.5, opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(-12px)", transition: `opacity 0.4s ease ${i * 0.05 + 0.1}s, transform 0.4s ease ${i * 0.05 + 0.1}s, color 0.3s ease` }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--color-amber)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--color-cream)"}
            >{l.label}</Link>
          ))}
        </div>
        <div style={{ width: "48px", height: "1px", background: "rgba(138,43,11,0.4)", marginTop: "2.5rem", opacity: open ? 1 : 0, transition: "opacity 0.4s ease 0.5s" }} />
      </div>
    </>
  )
}

// ─────────────────────────────────────────────
// NAVICON
// ─────────────────────────────────────────────
function NavIcon({ label, to, icon, circle, marginRight, labelTop, labelLeft, isHome, isActive, onClick }) {
  const isMenu = label === "Menu"
  const permanentlyVisible = !isMenu && (isHome || isActive)
  const [hovered, setHovered] = useState(false)

  const labelContent = label.includes("\n")
    ? label.split("\n").map((line, i) => (
        <span key={i} style={{ display: "block", textAlign: "center" }}>{line}</span>
      ))
    : label

  if (isMenu) {
    return (
      <div
        style={{ marginRight: marginRight || 0, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{ width: "2.5rem", height: "2.5rem", background: "rgba(70,30,5,0.15)", backdropFilter: "blur(8px)", borderColor: hovered ? "rgba(180,90,20,0.6)" : "rgba(87,83,78,0.4)" }}
        >
          <img src={icon} alt={label} style={{ width: "2rem", height: "1.5rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
        <span className="font-mono uppercase tracking-widest" style={{ fontSize: "12px", position: "absolute", top: labelTop || "2.5rem", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", color: hovered ? "var(--color-amber)" : "rgba(168,162,158,1)", opacity: hovered ? 1 : 0, transition: "color 0.3s ease, opacity 0.3s ease", pointerEvents: "none" }}>
          {label}
        </span>
      </div>
    )
  }

  return (
    <Link
      to={to}
      className="group"
      style={{ marginRight: marginRight || 0, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {circle ? (
        <div
          className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{ width: "2.5rem", height: "2.5rem", background: "rgba(70,30,5,0.15)", backdropFilter: "blur(8px)", borderColor: hovered ? "rgba(180,90,20,0.6)" : "rgba(87,83,78,0.4)" }}
        >
          <img src={icon} alt={label} style={{ width: "2rem", height: "1.5rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
      ) : (
        <div style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={icon} alt={label} style={{ width: "2rem", height: "1.5rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
      )}
      <span
        className="font-mono uppercase tracking-widest"
        style={{
          fontSize: "12px",
          position: "absolute",
          top: labelTop || "2.7rem",
          left: `calc(50% + ${labelLeft || 0}px)`,
          transform: "translateX(-50%)",
          whiteSpace: label.includes("\n") ? "normal" : "nowrap",
          textAlign: "center",
          color: hovered ? "var(--color-amber)" : "rgba(168,162,158,1)",
          opacity: permanentlyVisible && !isHome ? 1 : (hovered ? 1 : 0),
          animation: (permanentlyVisible && isHome)
            ? `fadeInLabel ${LABEL_FADE_DURATION}s ease ${LABEL_FADE_DELAY}s forwards`
            : "none",
          transition: "color 0.3s ease, opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        {labelContent}
      </span>
    </Link>
  )
}

// ─────────────────────────────────────────────
// PILL ICON
// ─────────────────────────────────────────────
function PillIcon({ label, to, icon, labelTop, labelLeft, isHome, isActive, hoverOnly  }) {
  const permanentlyVisible = !hoverOnly && (isHome || isActive)
  const [hovered, setHovered] = useState(false)

  const labelContent = label.includes("\n")
    ? label.split("\n").map((line, i) => (
        <span key={i} style={{ display: "block", textAlign: "center" }}>{line}</span>
      ))
    : label

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "1.5rem", height: "2rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={to} className="flex items-center justify-center">
        <img src={icon} alt={label} style={{ width: "2rem", height: "1.5rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
      </Link>
      <span
        className="font-mono uppercase tracking-widest"
        style={{
          fontSize: "12px",
          position: "absolute",
          top: labelTop || "2.2rem",
          left: `calc(50% + ${labelLeft || 0}px)`,
          transform: "translateX(-50%)",
          whiteSpace: label.includes("\n") ? "normal" : "nowrap",
          textAlign: "center",
          color: hovered ? "var(--color-amber)" : "rgba(168,162,158,1)",
          opacity: permanentlyVisible && !isHome ? 1 : (hovered ? 1 : 0),
          animation: (permanentlyVisible && isHome)
            ? `fadeInLabel ${LABEL_FADE_DURATION}s ease ${LABEL_FADE_DELAY}s forwards`
            : "none",
          transition: "color 0.3s ease, opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        {labelContent}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────
// HAMBURGER
// ─────────────────────────────────────────────
function Hamburger({ open, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "none", border: "none", cursor: "pointer",
      padding: "0.5rem", display: "flex", flexDirection: "column",
      gap: "5px", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-cream)", transform: open ? "translateY(6.5px) rotate(45deg)" : "none", transition: "transform 0.3s ease" }} />
      <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-cream)", opacity: open ? 0 : 1, transition: "opacity 0.3s ease" }} />
      <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-cream)", transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none", transition: "transform 0.3s ease" }} />
    </button>
  )
}

// ─────────────────────────────────────────────
// MOBILE MENU OVERLAY
// ─────────────────────────────────────────────
function MobileMenu({ open, onClose, lang, setLang }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(2,1,0,0.97)", backdropFilter: "blur(12px)",
      zIndex: 49, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "0.25rem",
      opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
      transition: "opacity 0.35s ease",
    }}>
      {allMobileLinks.map((l, i) => (
        <Link key={l.label} to={l.to} onClick={onClose} style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: "clamp(2rem, 8vw, 3rem)",
          color: "var(--color-cream)", fontWeight: 700,
          textDecoration: "none", letterSpacing: "-0.01em", lineHeight: 1.4,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
        }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--color-amber)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--color-cream)"}
        >
          {l.label}
        </Link>
      ))}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
        {["FR", "EN"].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            fontFamily: "Courier New, monospace", fontSize: "13px",
            textTransform: "uppercase", letterSpacing: "0.3em",
            background: "none", border: "none", cursor: "pointer",
            color: lang === l ? "var(--color-amber-soft)" : "rgba(245,240,232,0.35)",
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
  const [lang,     setLang]     = useState("FR")
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1025)    // window.innerWidth < 768
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isHome    = pathname === "/"
  const activeLabel = getActiveLabel(pathname)

  useEffect(() => {
    const threshold = pathname === "/partenaires" ? 1 : 50
    setScrolled(window.scrollY > threshold)
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", handleScroll)
    return () => { window.removeEventListener("scroll", handleScroll); setScrolled(false) }
  }, [pathname])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1025)   // window.innerWidth < 768
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => { setMenuOpen(false); setDrawerOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = (menuOpen || drawerOpen) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <style>{`
        @keyframes fadeInLabel {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <nav className="fixed top-0 left-0 w-full z-50" style={{
        background: (scrolled || menuOpen || drawerOpen) ? "rgba(2,1,0,0.85)" : "transparent",
        backdropFilter: (scrolled || menuOpen || drawerOpen) ? "blur(5px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}>

        {isMobile ? (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingLeft: "1.5rem", paddingRight: "1.5rem",
            paddingTop: "1.2rem", paddingBottom: "1.2rem",
          }}>
            <Hamburger open={menuOpen} onClick={() => setMenuOpen(o => !o)} />
            <Link to="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "2.2rem", color: "var(--color-cream)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                caphein
              </span>
            </Link>
            <Link to="/panier" style={{ display: "flex", alignItems: "center" }}>
              <img src={navPanier} alt="Panier" style={{ width: "1.6rem", height: "1.4rem", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </Link>
          </div>

        ) : (
          <>
            {/* FR/EN */}
            <div className="absolute flex items-center gap-1" style={{ top: "1.8rem", right: "3.7rem" }}>
              <button onClick={() => setLang("FR")} className={`font-mono uppercase tracking-widest transition-colors duration-300 ${lang === "FR" ? "text-amber-500" : "text-stone-500 hover:text-amber-600"}`} style={{ fontSize: "13px" }}>FR</button>
              <span className="text-stone-600" style={{ fontSize: "9px" }}>/</span>
              <button onClick={() => setLang("EN")} className={`font-mono uppercase tracking-widest transition-colors duration-300 ${lang === "EN" ? "text-amber-500" : "text-stone-500 hover:text-amber-600"}`} style={{ fontSize: "13px" }}>EN</button>
            </div>

            {/* MAIN ROW */}
            <div className="w-full flex items-center justify-between" style={{
              paddingLeft: "2.5rem", paddingRight: "2.5rem",
              paddingTop: "1.5rem", paddingBottom: "1.5rem",
            }}>
              {/* LEFT */}
              <div className="flex items-center flex-1" style={{ gap: "2vw" }}>
                {leftLinks.map(l => (
                  <NavIcon
                    key={l.label} {...l}
                    isHome={isHome}
                    isActive={activeLabel === l.label}
                    onClick={l.label === "Menu" ? () => setDrawerOpen(o => !o) : undefined}
                  />
                ))}
              </div>

              {/* LOGO */}
              <Link to="/" style={{ fontFamily: "'Bodoni Moda', serif", transform: "translateY(-0.5rem)" }}>
                <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(4rem, 5.5vw, 5.5rem)", color: "var(--color-cream)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  caphein
                </span>
              </Link>

              {/* RIGHT */}
              <div className="flex items-center flex-1 justify-end" style={{ gap: "2vw" }}>
                {rightLinks.map(l => (
                  <NavIcon
                    key={l.label} {...l}
                    isHome={isHome}
                    isActive={activeLabel === l.label}
                  />
                ))}
                <div className="flex items-center border border-stone-600/40 rounded-full" style={{
                  background: "rgba(70,30,5,0.15)", backdropFilter: "blur(8px)",
                  gap: "0.8rem", paddingLeft: "0.7rem", paddingRight: "0.7rem",
                  paddingTop: "0.2rem", paddingBottom: "0.2rem",
                }}>
                  {pillLinks.map(l => (
                    <PillIcon
                      key={l.label} {...l}
                      isHome={isHome}
                      isActive={activeLabel === l.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
      {!isMobile && (
        <DesktopDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      )}
      {isMobile && (
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} setLang={setLang} />
      )}
    </>
  )
}
