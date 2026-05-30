import { useState, useRef, useEffect, useCallback } from "react"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"
import Footer from "../components/Footer"
import franceSrc from "../assets/FranceTransparent.png"
import vietnamSrc from "../assets/VietnamTransparent.png"

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
// Increase x → moves right │ Increase y → moves down
// ─────────────────────────────────────────────────────────────────────────────
const DOT_POSITIONS = {
  paris:    { x: 46, y: 28, lx:  12, ly: 0  },
  toulouse: { x: 42, y: 70, lx:  12, ly: 0  },
  hanoi:    { x: 49, y: 16, lx:  12, ly: 0  },
  daklak:   { x: 67, y: 71, lx:  -18, ly: -15  },
}

// ─────────────────────────────────────────────────────────────────────────────
// ── EDIT MOBILE DOT POSITIONS HERE ───────────────────────────────────────────
// x, y   → dot position as % of map size
// lx, ly → label offset in px from the dot center
//           lx: positive = right, negative = left
//           ly: positive = down,  negative = up
// ─────────────────────────────────────────────────────────────────────────────
const DOT_POSITIONS_MOBILE = {
  paris:    { x: 47, y: 25, lx:  12, ly: 0  },
  toulouse: { x: 43, y: 72, lx:  12, ly: 0  },
  hanoi:    { x: 49, y: 16, lx:  -20, ly: -17  },
  daklak:   { x: 65, y: 71, lx: -45, ly: -20  },
}

// ─────────────────────────────────────────────────────────────────────────────
// ── EDIT LINE STYLE HERE ──────────────────────────────────────────────────────
// dashArray: "0" = solid │ "4 5" = dashed │ "2 4" = dotted
// ─────────────────────────────────────────────────────────────────────────────
const LINE_STYLE = {
  color:     "rgba(194,68,15,0.6)",
  width:     1,
  dashArray: "4 5",
}

const MAP_FILTER_DEFAULT = "invert(1) brightness(0.75)"
const MAP_FILTER_HOVER   = "invert(1) sepia(0.8) saturate(4) hue-rotate(320deg) brightness(0.85)"

const MAP_HEIGHT_DESKTOP = 500  // px desktop
const MAP_HEIGHT_MOBILE  = 320  // px mobile — shorter since it's full width

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

// ─── SWITCH BUTTON ────────────────────────────────────────────────────────────
function SwitchButton({ label, onClick, direction }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: direction === "up" ? "column-reverse" : "column",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        padding: "0.6rem 1.4rem",
        position: "sticky",
        bottom: direction === "down" ? "1.5rem" : "auto",
        top:    direction === "up"   ? "10rem"  : "auto",
        zIndex: 40,
        background: "rgba(2,1,0,0.85)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${hov ? "rgba(194,68,15,0.6)" : "rgba(138,43,11,0.25)"}`,
        borderRadius: "2rem",
        transition: "border-color 0.3s ease",
        alignSelf: "center",
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      <p style={{
        fontFamily: "Courier New, monospace",
        fontSize: "11px",
        color: hov ? "#c2440f" : "rgba(245,240,232,0.45)",
        textTransform: "uppercase",
        letterSpacing: "0.3em",
        transition: "color 0.3s ease",
        margin: 0,
        whiteSpace: "nowrap",
      }}>
        {label}
      </p>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        {direction === "up" ? (
          <path d="M6 10L6 2M6 2L2 6M6 2L10 6"
            stroke={hov ? "#c2440f" : "rgba(245,240,232,0.4)"}
            strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M6 2L6 10M6 10L2 6M6 10L10 6"
            stroke={hov ? "#c2440f" : "rgba(245,240,232,0.4)"}
            strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </div>
  )
}

// ─── MAP WITH DOTS ────────────────────────────────────────────────────────────
function MapWithDots({ src, partners, selected, onSelect, mapRef, isMobile }) {
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
  }, [src])

  useEffect(() => {
    if (mapRef) mapRef.current = containerRef.current
  })

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: `${mapHeight}px` }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <img
        src={src}
        alt=""
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "contain", objectPosition: "center",
          display: "block",
          filter: hovered ? MAP_FILTER_HOVER : MAP_FILTER_DEFAULT,
          transition: "filter 0.35s ease",
        }}
      />

      {/* Dots */}
      {size.w > 0 && partners.map(p => {
        const positions = isMobile ? DOT_POSITIONS_MOBILE : DOT_POSITIONS
        const pos   = positions[p.id]
        const x     = (pos.x / 100) * size.w
        const y     = (pos.y / 100) * size.h
        const isSel = selected?.id === p.id
        // larger tap area on mobile
        const hitSize = isMobile ? "44px" : "0px"

        return (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            style={{
              position: "absolute",
              left: x, top: y,
              width: 0, height: 0,
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            {/* Invisible large tap area for mobile */}
            {isMobile && (
              <div style={{
                position: "absolute",
                width: hitSize, height: hitSize,
                top: 0, left: 0,
                transform: "translate(-50%, -50%)",
              }} />
            )}

            {/* Pulse ring */}
            {isSel && (
              <div style={{
                position: "absolute",
                width: "22px", height: "22px",
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
              borderRadius: "50%",
              top: 0, left: 0,
              transform: "translate(-50%, -50%)",
              border: `1px solid ${isSel ? "rgba(194,68,15,0.9)" : "rgba(245,240,232,0.5)"}`,
              background: isSel ? "rgba(138,43,11,0.3)" : "transparent",
              transition: "all 0.3s ease",
            }}>
              {/* Inner dot */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: isMobile ? "7px" : "5px",
                height: isMobile ? "7px" : "5px",
                borderRadius: "50%",
                background: isSel ? "#c2440f" : "rgba(245,240,232,0.7)",
                transition: "background 0.3s ease",
              }} />
            </div>

            {/* City label — position controlled by lx/ly in config */}
            <p style={{
              position: "absolute",
              left: `${pos.lx}px`,
              top: `${pos.ly}px`,
              transform: "translateY(-50%)",
              fontFamily: "Courier New, monospace",
              fontSize: isMobile ? "10px" : "9px",
              color: isSel ? "rgba(245,240,232,0.85)" : "rgba(245,240,232,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              whiteSpace: "nowrap",
              margin: 0,
              pointerEvents: "none",
              transition: "color 0.3s ease",
            }}>
              {p.city}
            </p>
          </div>
        )
      })}
    </div>
  )
}

// ─── CONNECTING LINE — desktop only ──────────────────────────────────────────
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
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "radial-gradient(ellipse at 40% 40%, rgba(138,43,11,0.25) 0%, #0a0604 80%)",
        marginBottom: "1.5rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid rgba(70,30,5,0.3)",
      }}>
        <p style={{
          fontFamily: "Courier New, monospace", fontSize: "11px",
          color: "rgba(245,240,232,0.2)", textTransform: "uppercase",
          letterSpacing: "0.2em",
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
        color: "#f5f0e8", fontWeight: 800,
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

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Partners() {
  const isMobile = useIsMobile()

  const [country,    setCountry]    = useState("france")
  const [visible,    setVisible]    = useState(true)
  const [selectedFR, setSelectedFR] = useState(null)
  const [selectedVN, setSelectedVN] = useState(null)

  const mapRef    = useRef(null)
  const cardRef   = useRef(null)
  const rootRef   = useRef(null)
  const infoRef   = useRef(null)  // mobile: ref to info block for auto-scroll

  const isFrance    = country === "france"
  const partners    = isFrance ? francePartners : vietnamPartners
  const selected    = isFrance ? selectedFR     : selectedVN
  const setSelected = isFrance ? setSelectedFR  : setSelectedVN
  const mapSrc      = isFrance ? franceSrc      : vietnamSrc

  const switchTo = (c) => {
    setVisible(false)
    setSelectedFR(null)
    setSelectedVN(null)
    cardRef.current = null
    window.scrollTo(0, 0)
    setTimeout(() => { setCountry(c); setVisible(true) }, 280)
  }

  // Mobile: auto-scroll to info when a partner is selected
  const handleSelect = (p) => {
    setSelected(prev => {
      const next = prev?.id === p.id ? null : p
      if (next && isMobile) {
        setTimeout(() => {
          infoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
      return next
    })
  }

  return (
    <div style={{
      background: "#020100", color: "#f5f0e8",
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

        {/* Button above — Vietnam only */}
        {!isFrance && (
          <SwitchButton
            label="Partenaires en France"
            onClick={() => switchTo("france")}
            direction="up"
          />
        )}

        {/* ── MAIN CONTENT ── */}
        <div
          ref={rootRef}
          style={{
            flex: 1, position: "relative",
            maxWidth: "1200px", width: "100%",
            margin: "0 auto",
            padding: isMobile ? "1.5rem 1.5rem" : "2rem 3rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.28s ease",
          }}
        >
          <Orb top="40%" left={isFrance ? "15%" : "85%"} size="50vw" opacity={0.13} />

          {/* Country name */}
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: isMobile ? "clamp(2.5rem, 10vw, 3.5rem)" : "clamp(3rem, 6vw, 5.5rem)",
            color: "#f5f0e8", fontWeight: 800,
            lineHeight: 1,
            marginBottom: isMobile ? "1.5rem" : "2.5rem",
            // on mobile Vietnam, push title down below the sticky "back to France" button
            marginTop: (isMobile && !isFrance) ? "5rem" : 0,
            textAlign: isMobile ? "left" : (isFrance ? "left" : "right"),
            position: "relative", zIndex: 1,
          }}>
            {isFrance ? "France" : "Vietnam"}
          </h2>

          {isMobile ? (
            /* ── MOBILE LAYOUT: map full width, info below ── */
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

              {/* Map — full width */}
              <MapWithDots
                src={mapSrc}
                partners={partners}
                selected={selected}
                onSelect={handleSelect}
                mapRef={mapRef}
                isMobile={true}
              />

              {/* Info — below map, auto-scrolled to on tap */}
              <div ref={infoRef} style={{ paddingTop: "0.5rem" }}>
                {selected
                  ? <PartnerInfo partner={selected} cardRef={cardRef} />
                  : <EmptyInfo />
                }
              </div>

            </div>
          ) : (
            /* ── DESKTOP LAYOUT: side by side ── */
            <>
              <div style={{
                display: "flex", gap: "4rem",
                alignItems: "flex-start",
                flexDirection: isFrance ? "row" : "row-reverse",
                position: "relative", zIndex: 1,
              }}>
                <div style={{ flex: "0 0 42%", maxWidth: "42%" }}>
                  <MapWithDots
                    src={mapSrc}
                    partners={partners}
                    selected={selected}
                    onSelect={(p) => setSelected(prev => prev?.id === p.id ? null : p)}
                    mapRef={mapRef}
                    isMobile={false}
                  />
                </div>
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

        {/* Button below — France only */}
        {isFrance && (
          <SwitchButton
            label="Partenaires au Vietnam"
            onClick={() => switchTo("vietnam")}
            direction="down"
          />
        )}

        <div style={{ marginTop: "4rem" }}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
