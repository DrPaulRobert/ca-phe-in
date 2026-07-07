import { useState, useRef, useEffect, useCallback } from "react"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"
import Footer from "../components/Footer"
import franceSrc from "../assets/FranceTransparent.png"
// import vietnamBgSrc from "../assets/Cartes/VIETNAM/MapVietnam_fond-01.png"
// Import SVG as React component — requires vite-plugin-svgr
import vietnamBorderSrc from "../assets/Cartes/VIETNAM/MapVietnam_limit country-01.svg"
import vietnamBgSrc from "../assets/Cartes/VIETNAM/result.png"

// ─── MOBILE DETECTION HOOK ───────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [])
  return isMobile
}

// ─── ORB ─────────────────────────────────────────────────────────────────────
function Orb({ top, left, size = "60vw", opacity = 0.2 }) {
  return (
    <div className="absolute rounded-full pointer-events-none" style={{
      width: size, height: size, top, left,
      background: "radial-gradient(circle, #8a2b0b 0%, transparent 60%)",
      opacity, transform: "translate(-50%, -50%)",
    }} />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ── EDIT DOT POSITIONS HERE ───────────────────────────────────────────────────
// x and y are percentages (0–100) of the map container width/height
// lx, ly → label offset in px from dot center
// ─────────────────────────────────────────────────────────────────────────────
const DOT_POSITIONS = {
  paris:    { x: 46, y: 28, lx:  12, ly: 0   },
  toulouse: { x: 42, y: 70, lx:  12, ly: 0   },
  hanoi:    { x: 51.5, y: 22, lx:  12, ly: 0   },
  daklak:   { x: 60, y: 69, lx: -18, ly: -15 },
}

const DOT_POSITIONS_MOBILE = {
  paris:    { x: 47, y: 25, lx:  12, ly: 0   },
  toulouse: { x: 43, y: 72, lx:  12, ly: 0   },
  hanoi:    { x: 51, y: 20, lx: -20, ly: -17 },
  daklak:   { x: 60, y: 65, lx: -45, ly: -20 },
}

// ─────────────────────────────────────────────────────────────────────────────
// ── EDIT LINE STYLE HERE ──────────────────────────────────────────────────────
const LINE_STYLE = {
  color:     "rgba(194,68,15,0.6)",
  width:     1,
  dashArray: "4 5",
}

// ─────────────────────────────────────────────────────────────────────────────
// ── EDIT MAP SIZES HERE ───────────────────────────────────────────────────────
const MAP_HEIGHT_DESKTOP = 800   // px — change to resize both maps on desktop
const MAP_HEIGHT_MOBILE  = 280   // px — change to resize both maps on mobile

// ─── DATA ─────────────────────────────────────────────────────────────────────
const francePartners = [
  {
    id: "paris",
    name: "Partenaire Paris",
    city: "Paris",
    description: "Torréfacteur artisanal installé dans le 11ème arrondissement.",
  },
  {
    id: "toulouse",
    name: "Partenaire Toulouse",
    city: "Toulouse",
    description: "Distributeur régional couvrant le Sud-Ouest de la France.",
  },
]

const vietnamPartners = [
  {
    id: "hanoi",
    name: "Partenaire Hanoi",
    city: "Hanoi",
    description: "Torréfacteur historique de la capitale.",
  },
  {
    id: "daklak",
    name: "Partenaire Dak Lak",
    city: "Dak Lak",
    description: "Producteur et coopérative agricole au cœur des Hauts Plateaux.",
  },
]

// ─── DOT ─────────────────────────────────────────────────────────────────────
function Dot({ p, x, y, pos, isSel, isMobile, onSelect }) {
  return (
    <div
      onClick={() => onSelect(p)}
      style={{
        position: "absolute", left: x, top: y,
        width: 0, height: 0,
        cursor: "pointer", zIndex: 10,
      }}
    >
      {/* Large tap area for mobile */}
      {isMobile && (
        <div style={{
          position: "absolute", width: "44px", height: "44px",
          top: 0, left: 0, transform: "translate(-50%, -50%)",
        }} />
      )}
      {/* Pulse ring when selected */}
      {isSel && (
        <div style={{
          position: "absolute", width: "22px", height: "22px",
          borderRadius: "50%",
          border: "1px solid rgba(194,68,15,0.5)",
          top: 0, left: 0,
          transform: "translate(-50%, -50%)",
          animation: "dotPulse 1.8s ease-out infinite",
          pointerEvents: "none",
        }} />
      )}
      {/* Outer ring */}
      <div style={{
        position: "absolute",
        width: isMobile ? "18px" : "14px",
        height: isMobile ? "18px" : "14px",
        borderRadius: "50%", top: 0, left: 0,
        transform: "translate(-50%, -50%)",
        border: `1px solid ${isSel ? "rgba(194,68,15,0.9)" : "rgba(245,240,232,0.5)"}`,
        background: isSel ? "rgba(138,43,11,0.3)" : "transparent",
        transition: "all 0.3s ease",
      }}>
        {/* Inner dot */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "7px" : "5px",
          height: isMobile ? "7px" : "5px",
          borderRadius: "50%",
          background: isSel ? "#c2440f" : "rgba(245,240,232,0.7)",
          transition: "background 0.3s ease",
        }} />
      </div>
      {/* City label */}
      <p style={{
        position: "absolute",
        left: `${pos.lx}px`, top: `${pos.ly}px`,
        transform: "translateY(-50%)",
        fontFamily: "Courier New, monospace",
        fontSize: isMobile ? "10px" : "9px",
        color: isSel ? "rgba(245,240,232,0.85)" : "rgba(245,240,232,0.4)",
        textTransform: "uppercase", letterSpacing: "0.15em",
        whiteSpace: "nowrap", margin: 0,
        pointerEvents: "none", transition: "color 0.3s ease",
      }}>
        {p.city}
      </p>
    </div>
  )
}

// ─── FRANCE MAP ───────────────────────────────────────────────────────────────
function FranceMapWithDots({ selected, onSelect, mapRef, isMobile }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hovered, setHovered] = useState(false)
  const mapHeight = isMobile ? MAP_HEIGHT_MOBILE : MAP_HEIGHT_DESKTOP

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      setSize({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => { if (mapRef) mapRef.current = containerRef.current })

  const filterDefault = "invert(1) brightness(0.75)"
  const filterHover   = "invert(1) sepia(0.8) saturate(4) hue-rotate(320deg) brightness(0.85)"

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: `${mapHeight}px` }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <img
        src={franceSrc}
        alt=""
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "contain", objectPosition: "top",
          filter: hovered ? filterHover : filterDefault,
          transition: "filter 0.35s ease",
        }}
      />
      {size.w > 0 && francePartners.map(p => {
        const pos = (isMobile ? DOT_POSITIONS_MOBILE : DOT_POSITIONS)[p.id]
        const x = (pos.x / 100) * size.w
        const y = (pos.y / 100) * size.h
        return (
          <Dot key={p.id} p={p} x={x} y={y} pos={pos}
            isSel={selected?.id === p.id} isMobile={isMobile} onSelect={onSelect} />
        )
      })}
    </div>
  )
}

// ─── VIETNAM MAP ──────────────────────────────────────────────────────────────
// Three layers stacked:
// 1. Background PNG (fond) — landscape atmosphere
// 2. SVG border as React component — hover triggers on actual shape, not rectangle
// 3. Dots overlaid via absolute positioning
//
// The SVG viewBox is "0 0 460.37 259" (landscape 1.78:1)
// The background PNG is 1919x1080 (also 1.78:1) — they align perfectly
//
// Hover color override:
// SVG uses .cls-1/.cls-2/.cls-5 with stroke:#e8e0d5 (cream)
// On hover we inject a <style> tag that overrides those classes to amber
// ─────────────────────────────────────────────────────────────────────────────
function VietnamMapWithDots({ selected, onSelect, mapRef, isMobile }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      setSize({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => { if (mapRef) mapRef.current = containerRef.current })

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "460.37 / 259",
        // No background, no isolation — let page background show through alpha
      }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      {/* ── Layer 1: Background atmosphere PNG ──
          Using <img> with mix-blend-mode lighten:
          - Transparent (alpha=0) areas → page background shows through
          - Dark land areas → visible against dark background               */}
      <img
        src={vietnamBgSrc}
        alt=""
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          opacity: 0.8,
        }}
      />


      {/* ── Layer 2: SVG border as img ───────────────────────────────────────
          Both use objectFit contain + same objectPosition → perfect overlap
          filter: invert makes dark SVG strokes become light/cream          */}
      <img
        src={vietnamBorderSrc}
        alt=""
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          filter: hovered
            ? "invert(1) sepia(1) saturate(4) hue-rotate(320deg) brightness(2)"           /* borders shape */
            : "invert(1) brightness(4)",
          transition: "filter 0.35s ease",
        }}
      />

      {/* ── Layer 3: Dots ── */}
      {size.w > 0 && vietnamPartners.map(p => {
        const pos = (isMobile ? DOT_POSITIONS_MOBILE : DOT_POSITIONS)[p.id]
        const x = (pos.x / 100) * size.w
        const y = (pos.y / 100) * size.h
        return (
          <Dot key={p.id} p={p} x={x} y={y} pos={pos}
            isSel={selected?.id === p.id} isMobile={isMobile} onSelect={onSelect} />
        )
      })}
    </div>
  )
}

// ─── CONNECTING LINE ──────────────────────────────────────────────────────────
function ConnectingLine({ mapRef, cardRef, dotId, rootRef, isFrance }) {
  const [coords, setCoords] = useState(null)

  const measure = useCallback(() => {
    if (!mapRef.current || !cardRef.current || !rootRef.current) return
    const root = rootRef.current.getBoundingClientRect()
    const map  = mapRef.current.getBoundingClientRect()
    const card = cardRef.current.getBoundingClientRect()
    const pos  = DOT_POSITIONS[dotId]
    const dotX = map.left + (pos.x / 100) * map.width  - root.left
    const dotY = map.top  + (pos.y / 100) * map.height - root.top
    const cardEdgeX = isFrance ? card.left - root.left : card.right - root.left
    const cardEdgeY = card.top - root.top + card.height * 0.2
    setCoords({ x1: dotX, y1: dotY, x2: cardEdgeX, y2: cardEdgeY, w: root.width, h: root.height })
  }, [dotId, isFrance, mapRef, cardRef, rootRef])

  useEffect(() => {
    const t = setTimeout(measure, 50)
    window.addEventListener("resize", measure)
    return () => { clearTimeout(t); window.removeEventListener("resize", measure) }
  }, [measure, dotId])

  if (!coords) return null

  return (
    <svg style={{
      position: "absolute", top: 0, left: 0,
      width: coords.w, height: coords.h,
      pointerEvents: "none", zIndex: 5,
      animation: "fadeIn 0.35s ease forwards", opacity: 0,
    }}>
      <line
        x1={coords.x1} y1={coords.y1}
        x2={coords.x2} y2={coords.y2}
        stroke={LINE_STYLE.color}
        strokeWidth={LINE_STYLE.width}
        strokeDasharray={LINE_STYLE.dashArray}
      />
      <circle cx={coords.x1} cy={coords.y1} r="2.5" fill="rgba(194,68,15,0.8)" />
    </svg>
  )
}

// ─── PARTNER INFO ─────────────────────────────────────────────────────────────
function PartnerInfo({ partner, cardRef }) {
  return (
    <div ref={cardRef} style={{ animation: "fadeIn 0.3s ease forwards", opacity: 0 }}>
      {/* ── Placeholder image — replace src with real photo when available ── */}
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "radial-gradient(ellipse at 40% 40%, rgba(138,43,11,0.25) 0%, #0a0604 80%)",
        marginBottom: "1.5rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid rgba(70,30,5,0.3)",
      }}>
        <p style={{
          fontFamily: "Courier New, monospace", fontSize: "11px",
          color: "rgba(245,240,232,0.2)", textTransform: "uppercase", letterSpacing: "0.2em",
        }}>photo à venir</p>
      </div>
      <p style={{
        fontFamily: "Courier New, monospace", fontSize: "11px",
        color: "rgba(138,43,11,0.9)", textTransform: "uppercase",
        letterSpacing: "0.35em", marginBottom: "0.5rem",
      }}>{partner.city}</p>
      <h3 style={{
        fontFamily: "'Bodoni Moda', serif",
        fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
        color: "var(--color-cream)", fontWeight: 800,
        marginBottom: "1rem", lineHeight: 1.1,
      }}>{partner.name}</h3>
      <p style={{
        fontFamily: "Courier New, monospace", fontSize: "14px",
        color: "rgba(245,240,232,0.5)", lineHeight: 1.85,
      }}>{partner.description}</p>
    </div>
  )
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyInfo() {
  return (
    <div style={{
      minHeight: "200px", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "1rem", opacity: 0.3,
    }}>
      <div style={{ width: "1px", height: "48px", background: "rgba(138,43,11,0.4)" }} />
      <p style={{
        fontFamily: "Courier New, monospace", fontSize: "11px",
        color: "rgba(245,240,232,0.4)", textTransform: "uppercase",
        letterSpacing: "0.3em", textAlign: "center",
      }}>Sélectionnez un point</p>
    </div>
  )
}

// ─── COUNTRY SECTION ──────────────────────────────────────────────────────────
function CountrySection({ title, partners, MapComponent, defaultSelectedId, isMobile, isFrance }) {
  const defaultPartner = partners.find(p => p.id === defaultSelectedId) || null
  const [selected, setSelected] = useState(defaultPartner)

  const mapRef  = useRef(null)
  const cardRef = useRef(null)
  const rootRef = useRef(null)
  const infoRef = useRef(null)

  const handleSelect = (p) => {
  setSelected(prev => prev?.id === p.id ? null : p)
}

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        /*maxWidth: "1200px", width: "100%",*/
        width: "90%",
        margin: "0 auto", /*margin: "0 auto",*/
        padding: isMobile ? "1rem" : "3.5rem 2rem",        /*whole padding*/
        marginBottom: isMobile ? "3rem" : "4rem",
      }}
    >
      {/* Country title */}                                 
      <h2 style={{
        fontFamily: "'Bodoni Moda', serif",
        fontSize: isMobile ? "clamp(1.5rem, 6vw, 2rem)" : "clamp(1.8rem, 3vw, 2.8rem)",
        color: "var(--color-cream)", fontWeight: 800,
        lineHeight: 2,
        marginBottom: isMobile ? "1.5rem" : "0.5rem",
        textAlign: isMobile ? "left" : (isFrance ? "left" : "right"),
        paddingLeft: (!isMobile && isFrance) ? "14%" : "0%",             /*Title padding*/
        paddingRight: (!isMobile && !isFrance) ? "28%" : "0%",
        position: "relative", zIndex: 1,
      }}>
        {title}
      </h2>

      {isMobile ? (
        /* ── MOBILE: map full width, info below ── */
        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <MapComponent
            selected={selected}
            onSelect={handleSelect}
            mapRef={mapRef}
            isMobile={true}
          />
          <div ref={infoRef} style={{ paddingTop: "0.5rem" }}>
            {selected
              ? <PartnerInfo partner={selected} cardRef={cardRef} />
              : <EmptyInfo />
            }
          </div>
        </div>
      ) : (
        /* ── DESKTOP: side by side ── */
        <>
          <div style={{
            display: "flex", gap: "2rem",
            alignItems: "flex-start",
            flexDirection: isFrance ? "row" : "row-reverse",
            position: "relative", zIndex: 1,
          }}>
            {/* Map container — control width here */}
            <div style={{ flex: "0 0 70%", maxWidth: "70%" }}>
              <MapComponent
                selected={selected}
                onSelect={handleSelect}
                mapRef={mapRef}
                isMobile={false}
              />
            </div>
            {/* Info panel */}
            <div style={{
              flex: 1, display: "flex",
              flexDirection: "column", justifyContent: "center",
              minHeight: "260px",
            }}>
              {selected
                ? <PartnerInfo partner={selected} cardRef={cardRef} />
                : <EmptyInfo />
              }
            </div>
          </div>

          {/* Connecting line — desktop only */}
          {selected && (
            <ConnectingLine
              mapRef={mapRef}
              cardRef={cardRef}
              dotId={selected.id}
              rootRef={rootRef}
              isFrance={isFrance}
            />
          )}
        </>
      )}
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Partners() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: "#020100", color: "var(--color-cream)",
      position: "relative", width: "100%", minHeight: "100vh",
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.8); opacity: 0; }
        }
      `}</style>

      <Grain opacity={0.15} />
      <Scrollbar />

      <div style={{
        paddingTop: isMobile ? "5rem" : "7rem",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>

        <Orb top="25%" left="80%" size="50vw" opacity={0.12} />
        <Orb top="60%" left="90%" size="50vw" opacity={0.12} />

        {/* ── VIETNAM — top ── */}
        <CountrySection
          title="Vietnam"
          partners={vietnamPartners}
          MapComponent={VietnamMapWithDots}
          defaultSelectedId="hanoi"
          isMobile={isMobile}
          isFrance={false}
        />

        {/* ── Divider ── */}
        <div style={{
          width: "48px", height: "1px",
          background: "rgba(138,43,11,0.4)",
          margin: "0 auto 5rem",                       /*Margin between the two maps*/
        }} />

        {/* ── FRANCE — bottom ── */}
        <CountrySection
          title="France"
          partners={francePartners}
          MapComponent={FranceMapWithDots}
          defaultSelectedId="paris"
          isMobile={isMobile}
          isFrance={true}
        />

        <div style={{ marginTop: "4rem" }}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
