import { useState } from "react"
import { Link } from "react-router-dom"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"

// ─── ORB ─────────────────────────────────────────────────────────────────────
function Orb({ top, left, right, bottom, size = "70vw", opacity = 0.25 }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        top, left, right, bottom,
        background: "radial-gradient(circle, #8a2b0b 0%, transparent 60%)",
        opacity,
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const coffees = [
  {
    id: "arabica",
    name: "Arabica",
    origin: "Da Lat, Vietnam",
    altitude: "1 500 m",
    notes: ["Floral", "Fruité", "Délicat"],
    description:
      "Cultivé sur les hauts plateaux brumeux de Da Lat, cet Arabica développe une acidité vive et des arômes floraux caractéristiques du terroir vietnamien.",
    roast: "Torréfaction claire",
    color: "#6b3a1f",
  },
  {
    id: "catimor",
    name: "Catimor",
    origin: "Dak Lak, Vietnam",
    altitude: "800 m",
    notes: ["Épicé", "Chocolaté", "Équilibré"],
    description:
      "Hybride robuste et aromatique, le Catimor de Dak Lak offre un profil généreux avec des notes de chocolat noir et d'épices doucesB2B.",
    roast: "Torréfaction moyenne",
    color: "#7a2e0e",
  },
  {
    id: "robusta",
    name: "Robusta",
    origin: "Buôn Ma Thuột, Vietnam",
    altitude: "500 m",
    notes: ["Corsé", "Terreux", "Intense"],
    description:
      "Le cœur du café vietnamien. Ce Robusta de Buôn Ma Thuột est puissant, avec une crema épaisse et une caféine élevée.",
    roast: "Torréfaction foncée",
    color: "#5c1a0a",
  },
]

const packs = [
  {
    id: "essentiel",
    name: "Essentiel",
    label: "Le café, pur.",
    includes: ["Café sélectionné", "Emballage hermétique", "Fiche d'origine"],
    icon: "◈",
  },
  {
    id: "tradition",
    name: "Tradition",
    label: "L'expérience Phin.",
    includes: ["Tout Essentiel", "Filtre Phin vietnamien", "Guide de préparation"],
    icon: "◉",
  },
  {
    id: "rituel",
    name: "Rituel",
    label: "Le rituel complet.",
    includes: ["Tout Tradition", "Moulin à café manuel", "Boîte de conservation"],
    icon: "✦",
  },
]

const volumes = [
  { id: "1kg",  label: "1 kg",  sub: "~100 tasses" },
  { id: "3kg",  label: "3 kg",  sub: "~300 tasses" },
  { id: "10kg", label: "10 kg", sub: "~1 000 tasses" },
]

// Placeholder prices — replace with real prices when ready
const prices = {
  arabica: { essentiel: { "1kg": 22, "3kg": 60,  "10kg": 180 }, tradition: { "1kg": 38, "3kg": 95,  "10kg": 270 }, rituel: { "1kg": 58, "3kg": 140, "10kg": 390 } },
  catimor: { essentiel: { "1kg": 18, "3kg": 50,  "10kg": 150 }, tradition: { "1kg": 34, "3kg": 85,  "10kg": 240 }, rituel: { "1kg": 54, "3kg": 130, "10kg": 360 } },
  robusta: { essentiel: { "1kg": 15, "3kg": 42,  "10kg": 125 }, tradition: { "1kg": 31, "3kg": 77,  "10kg": 215 }, rituel: { "1kg": 51, "3kg": 122, "10kg": 335 } },
}

// Shopify variant ID placeholders — replace with real IDs from Shopify dashboard
const variantIds = {
  arabica: { essentiel: { "1kg": "shopify_variant_001", "3kg": "shopify_variant_002", "10kg": "shopify_variant_003" }, tradition: { "1kg": "shopify_variant_004", "3kg": "shopify_variant_005", "10kg": "shopify_variant_006" }, rituel: { "1kg": "shopify_variant_007", "3kg": "shopify_variant_008", "10kg": "shopify_variant_009" } },
  catimor: { essentiel: { "1kg": "shopify_variant_010", "3kg": "shopify_variant_011", "10kg": "shopify_variant_012" }, tradition: { "1kg": "shopify_variant_013", "3kg": "shopify_variant_014", "10kg": "shopify_variant_015" }, rituel: { "1kg": "shopify_variant_016", "3kg": "shopify_variant_017", "10kg": "shopify_variant_018" } },
  robusta: { essentiel: { "1kg": "shopify_variant_019", "3kg": "shopify_variant_020", "10kg": "shopify_variant_021" }, tradition: { "1kg": "shopify_variant_022", "3kg": "shopify_variant_023", "10kg": "shopify_variant_024" }, rituel: { "1kg": "shopify_variant_025", "3kg": "shopify_variant_026", "10kg": "shopify_variant_027" } },
}

// ─── SHOPIFY HANDLER ──────────────────────────────────────────────────────────
function handleAddToCart(variantId, coffeeName, packName, volumeId) {
  // TODO: connect Shopify Storefront API here
  // Example when ready:
  //   const client = ShopifyBuy.buildClient({ domain: 'your-store.myshopify.com', storefrontAccessToken: 'xxx' })
  //   const checkout = await client.checkout.create()
  //   await client.checkout.addLineItems(checkout.id, [{ variantId, quantity: 1 }])
  //   window.location.href = checkout.webUrl
  console.log(`[Shopify TODO] Add to cart → variantId: ${variantId} | ${coffeeName} ${packName} ${volumeId}`)
  alert(`Bientôt disponible !\n${coffeeName} · ${packName} · ${volumeId}`)
}

// ─── COFFEE CARD ──────────────────────────────────────────────────────────────
function CoffeeCard({ coffee, selected, onClick, index, anySelected }) {
  const flexGrow = selected ? 2 : anySelected ? 0.7 : 1

  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative"
      style={{
        border: selected
          ? "1px solid rgba(138,43,11,0.8)"
          : "1px solid rgba(70,30,5,0.3)",
        background: selected
          ? "rgba(138,43,11,0.12)"
          : "rgba(70,30,5,0.04)",
        backdropFilter: "blur(8px)",
        transition: "all 0.45s ease, flex-grow 0.45s ease",
        padding: "2rem",
        flexGrow,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,
        // Fixed height — card never grows vertically when description appears
        height: "480px",          // ← adjust this single value if you want cards taller/shorter
        overflow: "hidden",       // description clips inside, no vertical expansion
        display: "flex",
        flexDirection: "column",
        animation: `fadeSlideUp 0.6s ease forwards`,
        animationDelay: `${index * 0.12}s`,
        opacity: 0,
      }}
    >
      {/* Placeholder image area — shrinks on selection to reveal description */}
      <div style={{
        width: "100%",
        height: selected ? "120px" : "200px",   // ← shrinks when selected to make room
        transition: "height 0.45s ease",
        flexShrink: 0,
        background: `radial-gradient(ellipse at 40% 40%, ${coffee.color}55 0%, #0a0604 70%)`,
        marginBottom: selected ? "0.75rem" : "1.5rem",
        transition: "height 0.45s ease, margin-bottom 0.45s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          width: "4rem", height: "5.5rem",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: `radial-gradient(ellipse, ${coffee.color} 0%, #1a0800 100%)`,
          position: "relative",
          transform: "rotate(-15deg)",
          boxShadow: `0 0 40px ${coffee.color}66`,
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "2px", height: "70%",
            background: "rgba(0,0,0,0.4)", borderRadius: "2px",
          }} />
        </div>
        <p style={{
          position: "absolute", bottom: "0.75rem", right: "0.75rem",
          fontFamily: "Courier New, monospace",
          fontSize: "11px",                          // FIX 1 — was 10px
          color: "rgba(245,240,232,0.3)",
          textTransform: "uppercase", letterSpacing: "0.15em",
        }}>
          image à venir
        </p>
      </div>

      {/* Selected dot */}
      {selected && (
        <div style={{
          position: "absolute", top: "1rem", right: "1rem",
          width: "8px", height: "8px", borderRadius: "50%",
          background: "#8a2b0b", boxShadow: "0 0 12px #8a2b0b",
        }} />
      )}

      {/* Origin + altitude */}
      <p style={{
        fontFamily: "Courier New, monospace",
        fontSize: "12px",                             // FIX 1 — was 10px
        color: "#8a2b0b",
        textTransform: "uppercase", letterSpacing: "0.3em",
        marginBottom: "0.5rem",
      }}>
        {coffee.origin} · {coffee.altitude}
      </p>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Bodoni Moda', serif",
        fontSize: "2.2rem", color: "#f5f0e8",
        fontWeight: 700, fontStyle: "italic",
        marginBottom: "0.75rem", lineHeight: 1,
      }}>
        {coffee.name}
      </h3>

      {/* Tasting note tags */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {coffee.notes.map(n => (
          <span key={n} style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px",                         // FIX 1 — was 9px
            color: "rgba(245,240,232,0.5)",
            textTransform: "uppercase", letterSpacing: "0.2em",
            border: "1px solid rgba(70,30,5,0.4)",
            padding: "2px 8px",
          }}>{n}</span>
        ))}
      </div>

      {/* FIX 2 — description + roast only when selected */}
      {selected && (
        <div style={{
          animation: "fadeIn 0.4s ease forwards",
          opacity: 0,
        }}>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "15px",                         // FIX 1
            color: "rgba(245,240,232,0.45)",
            lineHeight: 1.75,
            marginBottom: "1rem",
          }}>
            {coffee.description}
          </p>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "15px",                         // FIX 1
            color: "rgba(138,43,11,0.7)",
            textTransform: "uppercase", letterSpacing: "0.2em",
          }}>
            {coffee.roast}
          </p>
        </div>
      )}

      {/* Select CTA */}
      <div style={{
        marginTop: "1.5rem",
        fontFamily: "Courier New, monospace",
        fontSize: "12px",                             // FIX 1 — was 10px
        textTransform: "uppercase", letterSpacing: "0.25em",
        color: selected ? "#f5f0e8" : "rgba(245,240,232,0.3)",
        borderTop: "1px solid rgba(70,30,5,0.3)",
        paddingTop: "0.8rem",
        transition: "color 0.3s ease",
        display: "flex", alignItems: "center", gap: "0.5rem",
      }}>
        <span style={{
          display: "inline-block",
          width: "14px", height: "14px", borderRadius: "50%",
          border: `1px solid ${selected ? "#8a2b0b" : "rgba(70,30,5,0.4)"}`,
          background: selected ? "#8a2b0b" : "transparent",
          flexShrink: 0, transition: "all 0.3s ease",
        }} />
        {selected ? "Sélectionné" : "Sélectionner"}
      </div>
    </div>
  )
}

// ─── MATRIX CELL ──────────────────────────────────────────────────────────────
function MatrixCell({ coffee, pack, volume, locked, animDelay }) {
  const [hover, setHover] = useState(false)
  if (!coffee) return (
    <div style={{
      border: "1px solid rgba(70,30,5,0.15)",
      background: "rgba(10,6,4,0.3)",
      padding: "1.5rem 1rem",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "0.75rem", opacity: 0.25,
      minHeight: "130px",
    }}>
      <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.6rem", color: "rgba(245,240,232,0.15)" }}>—</p>
      <div style={{ fontFamily: "Courier New, monospace", fontSize: "11px", color: "rgba(245,240,232,0.08)", textTransform: "uppercase", letterSpacing: "0.2em" }}>— —</div>
    </div>
  )

  const price = prices[coffee.id][pack.id][volume.id]
  const variantId = variantIds[coffee.id][pack.id][volume.id]

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: hover ? "1px solid rgba(138,43,11,0.7)" : "1px solid rgba(70,30,5,0.3)",
        background: hover ? "rgba(138,43,11,0.1)" : "rgba(70,30,5,0.05)",
        padding: "1.5rem 1rem",
        transition: "all 0.35s ease",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between",
        gap: "0.75rem",
        animation: `fadeSlideUp 0.5s ease forwards`,
        animationDelay: `${animDelay}s`,
        opacity: 0,
        cursor: "pointer",
        minHeight: "130px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* FIX 3 — no "tasses" here, only price */}
        <p style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: "1.8rem", color: "#f5f0e8",
          fontWeight: 700, lineHeight: 1,
        }}>
          {price} €
        </p>
      </div>

      <button
        onClick={() => handleAddToCart(variantId, coffee.name, pack.name, volume.label)}
        style={{
          fontFamily: "Courier New, monospace",
          fontSize: "11px",                           // FIX 1 — was 9px
          textTransform: "uppercase", letterSpacing: "0.2em",
          color: hover ? "#f5f0e8" : "rgba(245,240,232,0.4)",
          background: hover ? "rgba(138,43,11,0.5)" : "transparent",
          border: `1px solid ${hover ? "rgba(138,43,11,0.8)" : "rgba(70,30,5,0.4)"}`,
          padding: "6px 14px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          width: "100%",
        }}
      >
        Ajouter →
      </button>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Products() {
  const [selectedCoffee, setSelectedCoffee] = useState(null)

  const handleSelect = (coffee) => {
    setSelectedCoffee(prev => prev?.id === coffee.id ? null : coffee)
  }

  const anySelected = selectedCoffee !== null

  return (
    <div style={{
      background: "#020100", color: "#f5f0e8",
      position: "relative", overflow: "hidden", width: "100%",
      minHeight: "100vh",
    }}>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <Grain opacity={0.15} />
      <Scrollbar />

      {/* ── PAGE HEADER ── */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <Orb top="20%" left="80%" size="60vw" opacity={0.3} />
        <Orb top="80%" left="10%" size="40vw" opacity={0.15} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "13px",                         // FIX 1
            color: "rgba(138,43,11,0.8)",
            textTransform: "uppercase", letterSpacing: "0.4em",
            marginBottom: "1.5rem",
          }}>
            Nos produits
          </p>
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            color: "#f5f0e8",
            fontWeight: 800, fontStyle: "italic",
            lineHeight: 1, marginBottom: "1.5rem",
          }}>
            Configurez votre café
          </h1>
          {/* FIX 1 — description text bumped to 15px */}
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "15px",
            color: "rgba(245,240,232,0.45)",
            maxWidth: "460px", lineHeight: 1.85,
          }}>
            Choisissez votre variété, votre formule et votre volume.
            Livraison directe pour entreprises dans toute la France.
          </p>
        </div>
      </section>

      {/* ── STEP 1: COFFEE CARD SLIDER ── */}
      <section className="relative px-6 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: "15px",                       // FIX 1
              color: "rgba(138,43,11,0.7)",
              textTransform: "uppercase", letterSpacing: "0.3em",
            }}>
              Étape 01
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(70,30,5,0.3)" }} />
            <span style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "1.5rem",                     // FIX 1
              color: "rgba(245,240,232,0.4)", fontStyle: "italic",
            }}>
              Choisissez votre variété
            </span>
          </div>

          {/* Cards — flex with animated width */}
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "stretch" }}>
            {coffees.map((coffee, i) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                selected={selectedCoffee?.id === coffee.id}
                anySelected={anySelected}
                onClick={() => handleSelect(coffee)}
                index={i}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── STEP 2: MATRIX ── */}
      <section className="relative px-6 pb-32 overflow-hidden">
        <Orb top="50%" left="50%" size="80vw" opacity={0.1} />
        <div className="relative z-10 max-w-6xl mx-auto">

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: "15px",                       // FIX 1
              color: selectedCoffee ? "rgba(138,43,11,0.7)" : "rgba(70,30,5,0.3)",
              textTransform: "uppercase", letterSpacing: "0.3em",
              transition: "color 0.5s ease",
            }}>
              Étape 02
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(70,30,5,0.3)" }} />
            <span style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "1.5rem",                     // FIX 1
              color: selectedCoffee ? "rgba(245,240,232,0.4)" : "rgba(245,240,232,0.15)",
              fontStyle: "italic", transition: "color 0.5s ease",
            }}>
              {selectedCoffee
                ? `${selectedCoffee.name} — choisissez votre formule et volume`
                : "Sélectionnez d'abord une variété"}
            </span>
          </div>

          {/* Matrix */}
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: "600px" }}>

              {/* Column headers */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "110px repeat(3, 1fr)",
                gap: "1.5rem", marginBottom: "0.75rem",
              }}>
                <div />
                {packs.map(pack => (
                  <div key={pack.id} style={{ textAlign: "center" }}>
                    <p style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: "1.7rem",
                      color: selectedCoffee ? "#f5f0e8" : "rgba(245,240,232,0.2)",
                      fontWeight: 700, fontStyle: "italic",
                      transition: "color 0.5s ease", marginBottom: "0.2rem",
                    }}>
                      {pack.icon} {pack.name}
                    </p>
                    <p style={{
                      fontFamily: "Courier New, monospace",
                      fontSize: "15px",               // FIX 1 — was 9px
                      color: selectedCoffee ? "rgba(138,43,11,0.7)" : "rgba(70,30,5,0.3)",
                      textTransform: "uppercase", letterSpacing: "0.2em",
                      transition: "color 0.5s ease",
                    }}>
                      {pack.label}
                    </p>
                    <div style={{ marginTop: "0.5rem" }}>
                      {pack.includes.map(item => (
                        <p key={item} style={{
                          fontFamily: "Courier New, monospace",
                          fontSize: "15px",           // FIX 1 — was 8px
                          color: selectedCoffee ? "rgba(245,240,232,0.25)" : "rgba(245,240,232,0.07)",
                          lineHeight: 1.8, transition: "color 0.5s ease",
                        }}>
                          + {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {volumes.map((volume, vi) => (
                <div key={volume.id} style={{
                  display: "grid",
                  gridTemplateColumns: "110px repeat(3, 1fr)",
                  gap: "1.5rem", marginBottom: "1.5rem",
                }}>
                  {/* Row label — FIX 3: keep "tasses" here */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: "1rem" }}>
                    <p style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: "2rem",
                      color: selectedCoffee ? "#f5f0e8" : "rgba(245,240,232,0.2)",
                      fontWeight: 700, transition: "color 0.5s ease", lineHeight: 1,
                    }}>
                      {volume.label}
                    </p>
                    <p style={{
                      fontFamily: "Courier New, monospace",
                      fontSize: "15px",               // FIX 1 — was 9px
                      color: selectedCoffee ? "rgba(245,240,232,0.3)" : "rgba(245,240,232,0.08)",
                      textTransform: "uppercase", letterSpacing: "0.15em",
                      marginTop: "0.25rem", transition: "color 0.5s ease",
                    }}>
                      {volume.sub}
                    </p>
                  </div>

                  {packs.map((pack, pi) => (
                    <MatrixCell
                      key={pack.id}
                      coffee={selectedCoffee}
                      pack={pack}
                      volume={volume}
                      locked={!selectedCoffee}
                      animDelay={(vi * 3 + pi) * 0.06}
                    />
                  ))}
                </div>
              ))}

            </div>
          </div>

          {/* B2B note */}
          <div style={{
            marginTop: "3rem",
            borderTop: "1px solid rgba(70,30,5,0.2)",
            paddingTop: "2rem",
            display: "flex", alignItems: "flex-start",
            gap: "2rem", flexWrap: "wrap",
          }}>
            <div>
              <p style={{
                fontFamily: "Courier New, monospace",
                fontSize: "11px",                     // FIX 1
                color: "rgba(138,43,11,0.6)",
                textTransform: "uppercase", letterSpacing: "0.3em",
                marginBottom: "0.4rem",
              }}>
                Commande B2B
              </p>
              <p style={{
                fontFamily: "Courier New, monospace",
                fontSize: "14px",                     // FIX 1 — was 11px
                color: "rgba(245,240,232,0.35)",
                lineHeight: 1.75, maxWidth: "380px",
              }}>
                Vous avez un volume ou un besoin spécifique ?
                Contactez-nous pour un devis personnalisé.
              </p>
            </div>
            <a
              href="/contact"
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: "13px",                     // FIX 1
                textTransform: "uppercase", letterSpacing: "0.25em",
                color: "rgba(245,240,232,0.4)",
                borderBottom: "1px solid rgba(70,30,5,0.5)",
                paddingBottom: "4px", textDecoration: "none",
                alignSelf: "flex-end", transition: "color 0.3s ease", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#c2440f"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.4)"}
            >
              Demander un devis →
            </a>
          </div>

        </div>
      </section>

      {/* ── FIX 4 — FOOTER (same as Home) ── */}
      <footer className="relative py-16 px-6 overflow-hidden">
        <Orb top="70%" left="99%" size="600px" opacity={0.15} />
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">
          <span style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "2rem", color: "#f5f0e8", fontWeight: 700,
          }}>
            caphein
          </span>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {[
              { label: "Histoire",  to: "/our-story" },
              { label: "Culture",   to: "/culture" },
              { label: "Produits",  to: "/products" },
              { label: "Contact",   to: "/contact" },
            ].map(l => (
              <Link
                key={l.label}
                to={l.to}
                style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "12px",
                  color: "rgba(245,240,232,0.35)",
                  textTransform: "uppercase", letterSpacing: "0.25em",
                  textDecoration: "none", transition: "color 0.3s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#c2440f"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.35)"}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px", color: "rgba(245,240,232,0.2)",
          }}>
            © 2025 Caphein. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
