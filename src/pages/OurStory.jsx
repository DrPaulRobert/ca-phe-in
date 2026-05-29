import { useRef } from "react"
import { Link } from "react-router-dom"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"
import Footer from "../components/Footer"

// ─── ORB ─────────────────────────────────────────────────────────────────────
function Orb({ top, left, size = "70vw", opacity = 0.25 }) {
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

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "Courier New, monospace",
      fontSize: "11px",
      color: "rgba(138,43,11,0.9)",
      textTransform: "uppercase",
      letterSpacing: "0.4em",
      marginBottom: "1.5rem",
    }}>
      {children}
    </p>
  )
}

// ─── BODY TEXT ────────────────────────────────────────────────────────────────
function BodyText({ children }) {
  return (
    <p style={{
      fontFamily: "Courier New, monospace",
      fontSize: "15px",
      color: "rgba(245,240,232,0.6)",
      lineHeight: 1.9,
    }}>
      {children}
    </p>
  )
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      width: "48px", height: "1px",
      background: "rgba(138,43,11,0.5)",
      margin: "3rem 0",
    }} />
  )
}

// ─── STATS ───────────────────────────────────────────────────────────────────
const stats = [
  { value: "2ème",             label: "Le Vietnam, 2ème exportateur mondial de café" },
  { value: "1857",             label: "Début de la culture du café au Vietnam" },
  { value: "Vietnam · France", label: "2 pays · 1 passion" },
]

function StatsBar() {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      borderTop: "1px solid rgba(70,30,5,0.3)",
      borderBottom: "1px solid rgba(70,30,5,0.3)",
      marginBottom: "6rem",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: "1 1 200px",
          padding: "2.5rem 2rem",
          borderRight: i < stats.length - 1 ? "1px solid rgba(70,30,5,0.3)" : "none",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            color: "#f5f0e8",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: "0.6rem",
          }}>
            {s.value}
          </p>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px",
            color: "rgba(245,240,232,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            lineHeight: 1.6,
          }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── TEXT SECTION ─────────────────────────────────────────────────────────────
function TextSection({ label, heading, paragraphs, align = "left" }) {
  const isRight = align === "right"
  return (
    <div style={{
      display: "flex",
      justifyContent: isRight ? "flex-end" : "flex-start",
      marginBottom: "6rem",
    }}>
      <div style={{ maxWidth: "620px", width: "100%" }}>
        <SectionLabel>{label}</SectionLabel>
        {heading && (
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: "#f5f0e8",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "1.75rem",
          }}>
            {heading}
          </h2>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {paragraphs.map((p, i) => (
            <BodyText key={i}>{p}</BodyText>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PULL QUOTE ───────────────────────────────────────────────────────────────
function PullQuote({ text }) {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
      <div style={{
        width: "1px", height: "60px",
        background: "rgba(138,43,11,0.4)",
        margin: "0 auto 3rem",
      }} />
      <p style={{
        fontFamily: "'Bodoni Moda', serif",
        fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
        color: "#f5f0e8",
        fontWeight: 700,
        lineHeight: 1.4,
        maxWidth: "700px",
        margin: "0 auto",
      }}>
        {text}
      </p>
      <div style={{
        width: "1px", height: "60px",
        background: "rgba(138,43,11,0.4)",
        margin: "3rem auto 0",
      }} />
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function OurStory() {
  return (
    <div style={{
      background: "#020100",
      color: "#f5f0e8",
      position: "relative",
      overflow: "hidden",
      width: "100%",
      minHeight: "100vh",
    }}>

      <Grain opacity={0.15} />
      <Scrollbar />

      {/* ── HERO HEADER ── */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <Orb top="10%" left="80%" size="60vw" opacity={0.25} />
        <Orb top="90%" left="10%" size="40vw" opacity={0.12} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionLabel>Notre Histoire</SectionLabel>
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: "#f5f0e8",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: "2rem",
            whiteSpace: "nowrap",
          }}>
            Un pont entre deux mondes
          </h1>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "15px",
            color: "rgba(245,240,232,0.45)",
            maxWidth: "480px",
            lineHeight: 1.85,
          }}>
            Du Vietnam à la France, nous mettons en lumière
            des cafés d'exception encore méconnus en Europe.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <StatsBar />
        </div>
      </section>

      {/* ── TEXT SECTIONS ── */}
      <section className="relative px-6 overflow-hidden">
        <Orb top="20%" left="90%" size="50vw" opacity={0.15} />
        <Orb top="60%" left="5%"  size="45vw" opacity={0.12} />
        <Orb top="90%" left="70%" size="40vw" opacity={0.10} />

        <div className="relative z-10 max-w-5xl mx-auto">

          <TextSection
            label="Origine"
            heading="Nés de deux cultures"
            align="left"
            paragraphs={[
              "Nous sommes un groupe de professionnels et de passionnés, basés entre le Vietnam et la France, réunis par une passion commune : le café.",
              "Le Vietnam est aujourd'hui le deuxième plus grand exportateur mondial de café. Son histoire remonte au XIXe siècle, lorsque la culture du café a été introduite durant la période coloniale française. Pendant longtemps, le pays s'est concentré sur l'exportation de grains verts, torréfiés et valorisés à l'étranger.",
            ]}
          />

          <Divider />

          <TextSection
            label="Transformation"
            heading="Un savoir-faire en plein essor"
            align="right"
            paragraphs={[
              "Mais depuis quelques décennies, une véritable transformation est en marche. Le Vietnam développe ses propres méthodes de torréfaction, affine son savoir-faire et révèle progressivement tout le potentiel de ses cafés.",
              "Aujourd'hui, le marché local regorge de grains d'exception encore largement méconnus à l'international.",
            ]}
          />

          <Divider />

          <TextSection
            label="Notre rôle"
            heading="De l'origine à votre tasse"
            align="left"
            paragraphs={[
              "Notre mission est de faire découvrir ces cafés uniques.",
              "Nous sommes un point de contact direct entre les différents acteurs de la filière : agriculteurs, torréfacteurs et consommateurs. Nous intervenons comme importateurs, chasseurs de talents et intermédiaires, en sélectionnant rigoureusement nos partenaires sur le terrain et en créant des liens durables entre origine et destination.",
            ]}
          />

          <Divider />

          <TextSection
            label="Le Robusta"
            heading="L'espèce qui nous tient à coeur"
            align="right"
            paragraphs={[
              "Au cœur de cette richesse se trouve principalement le robusta, l'espèce la plus cultivée au Vietnam. Longtemps sous-estimé en France, il révèle pourtant des profils aromatiques particulièrement séduisants : des notes chocolatées, caramélisées, parfois fruitées, avec une texture dense, une intensité maîtrisée et une belle douceur.",
              "Polyvalent et accessible, il s'apprécie aussi bien en hiver qu'en été, et se décline dans une grande variété de préparations.",
              "Nous sélectionnons, torréfions et proposons des cafés vietnamiens de caractère, en mettant en avant leur origine, leur qualité et leur singularité, afin de créer un pont durable entre producteurs locaux et amateurs de café en Europe.",
            ]}
          />

        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="relative px-6 overflow-hidden">
        <Orb top="50%" left="50%" size="60vw" opacity={0.12} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <PullQuote text="Un pont durable entre producteurs locaux et amateurs de café en Europe." />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 pb-32 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <SectionLabel>Nos produits</SectionLabel>
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: "#f5f0e8",
            fontWeight: 800,
            marginBottom: "2rem",
          }}>
            Découvrez nos cafés vietnamiens
          </h2>
          <Link
            to="/products"
            onClick={() => window.scrollTo(0, 0)}
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "rgba(245,240,232,0.5)",
              borderBottom: "1px solid rgba(70,30,5,0.5)",
              paddingBottom: "4px",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#c2440f"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.5)"}
          >
            Voir nos produits →
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  )
}
