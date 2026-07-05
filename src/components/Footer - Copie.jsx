import { Link } from "react-router-dom"

// Reusable Orb (same as in Home / Products)
function Orb({ top, left, size = "600px", opacity = 0.15 }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        top, left,
        background: "radial-gradient(circle, #8a2b0b 0%, transparent 60%)",
        opacity,
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

const footerLinks = [
  { label: "Histoire",    to: "/our-story"   },
  { label: "Culture",     to: "/culture"     },
  { label: "Partenaires", to: "/partenaires" },
  { label: "Produits",    to: "/products"    },
  { label: "Contact",     to: "/contact"     },
  { label: "Mon café",    to: "/mon-cafe"    },
  { label: "Panier",      to: "/panier"      },
]

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      <Orb top="70%" left="99%" size="600px" opacity={0.15} />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">

        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "2rem", color: "var(--color-cream)", fontWeight: 700,
          }}>
            caphein
          </span>
        </Link>

        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {footerLinks.map(l => (
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
              onMouseEnter={e => e.currentTarget.style.color = "var(--color-amber)"}
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
  )
}
