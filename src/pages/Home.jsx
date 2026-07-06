import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import coffee1 from "../assets/PaquetCaféRobusta.png"
import coffee2 from "../assets/PaquetCaféCatimor.png"
import coffee3 from "../assets/PaquetCaféArabica.png"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"
import Footer from "../components/Footer"
import heroBg from "../assets/hero-bg.png"
import imgHistoire from "../assets/LanternVietnameseTraditional.png"
import imgCulture from "../assets/VietnamienChapeauConiqueRecolteCafe.png"
import imgPartenaires from "../assets/ManWomanSittingNetworkingCoffeeStreet.png"
import imgNouveautes from "../assets/OldManReadingNewsStreet.png"

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
function Orb({ top, left, right, bottom, size = "70vw", opacity = 0.25 }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top, left, right, bottom,
        background: "radial-gradient(circle, #8a2b0b 0%, transparent 60%)",
        opacity,
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

// ─── FADE IN ON SCROLL ────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ── DATA — Produits en avant ──────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
const featuredCoffees = [
  {
    name: "Fine Robusta",
    origin: "Dak Lak",
    roast: "Dark roast",
    process: "Full wash",
    partner: "Coffee Cart",
    image: coffee1,
  },
  {
    name: "Catimor",
    origin: "Da Lat",
    roast: "Dark roast",
    process: "Honey",
    partner: "Reng Reng coffee and roasters",
    image: coffee2,
  },
  {
    name: "Arabica",
    origin: "Son La",
    roast: "Dark roast",
    process: "Washed + Honey",
    partner: "Thai Yen coffee",
    image: coffee3,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ── DATA — Section previews (alternating left/right) ─────────────────────────
// Replace placeholderLabel sections with real images later via the same
// pattern as featuredCoffees above (import + image field)
// ─────────────────────────────────────────────────────────────────────────────
const sectionPreviews = [
  {
    label: "", /*Histoire*/
    to: "/our-story",
    title: "Histoire",
    text: "Du Vietnam à la France, découvrez l'histoire de celles et ceux qui font vivre Caphein — entre tradition agricole et savoir-faire de torréfaction.",
    image: imgHistoire,
    imageSize: "35%"
  },
  {
    label: "",/*Culture café*/
    to: "/culture",
    title: "Culture café",
    text: "Le phin, les rituels, les saveurs uniques d'une culture du café à part — explorez les traditions qui font du Vietnam une terre de café singulière.",
    image: imgCulture,
  },
  {
    label: "", /*Partenaires*/
    to: "/partenaires",
    title: "Partenaires",
    text: "Nous travaillons main dans la main avec des partenaires rigoureusement sélectionnés, du Vietnam à la France, pour garantir l'excellence à chaque étape.",
    image: imgPartenaires,
  },

  {
    label: "", /*Nouveautés*/
    to: "/nouveaute",
    title: "Les News",
    text: "Nouvelles origines, nouveaux partenaires, nouvelles préparations — suivez les dernières actualités de Caphein.",
    image: imgNouveautes,
  },
]

// ─── COFFEE CARD — simplified for landing page ───────────────────────────────
function FeaturedCoffeeCard({ coffee, index }) {
  return (
    <FadeIn delay={index * 0.1}>
      <div
        className="group"
        style={{
          border: "1px solid rgba(70,30,5,0.3)",
          background: "rgba(70,30,5,0.04)",
          transition: "border-color 0.4s ease",
        }}
      >
        <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
          <img
            src={coffee.image}
            alt={coffee.name}
            style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scale(1.2)" }}        /* "scale(1.2)" → zomm in*/
          />
        </div>
        <div style={{ padding: "1.75rem" }}>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px",
            color: "var(--color-amber)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            marginBottom: "0.5rem",
          }}>
            {coffee.origin}
          </p>
          <h3 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "1.5rem",
            color: "var(--color-cream)",
            fontWeight: 700,
            marginBottom: "0.75rem",
            lineHeight: 1.1,
          }}>
            {coffee.name}
          </h3>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: "10px",
              color: "rgba(245,240,232,0.4)",
              border: "1px solid rgba(70,30,5,0.4)",
              padding: "2px 8px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>{coffee.roast}</span>
            <span style={{
              fontFamily: "Courier New, monospace",
              fontSize: "10px",
              color: "rgba(245,240,232,0.4)",
              border: "1px solid rgba(70,30,5,0.4)",
              padding: "2px 8px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>{coffee.process}</span>
          </div>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px",
            color: "rgba(245,240,232,0.3)",
            fontStyle: "italic",
          }}>
            {coffee.partner}{/*Courtesy of*/}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── SECTION PREVIEW — alternating left/right with real images ───────────────
function SectionPreview({ preview, index, isMobile }) {
  const isRight = !isMobile && index % 2 === 1

  const imageBlock = (
    <div style={{
      flex: `0 0 clamp(280px, 40vw, 400px)`,
      Width: "clamp(280px, 40vw, 500px)",
      flexShrink: 0,  // ← prevents shrinking below the clamp value
      position: "relative",
      minHeight: isMobile ? "140px" : "420px",
      background: "transparent",
    }}>
      {preview.image ? (
        <>
          {/* Real image */}
          <img
            src={preview.image}
            alt={preview.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              opacity: 0.5,   // ← image brightness: 0=invisible, 1=full
            }}
          />
          {/* Gradient fade toward dark bg — direction depends on which side text is */}
          
          {/* Also fade top and bottom slightly */}
         
        </>
      ) : (
        /* Placeholder for sections without image yet */
        <div style={{
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(138,43,11,0.2) 0%, #0a0604 80%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}>
          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px",
            color: "rgba(245,240,232,0.2)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            textAlign: "center",
            lineHeight: 1.8,
          }}>
            image à venir<br />
            <span style={{ opacity: 0.6 }}>({preview.placeholderHint})</span>
          </p>
        </div>
      )}
    </div>
  )

  const textBlock = (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: isMobile ? 0 : "480px",                                                             /* Text width */
      justifyContent: "flex-start",                                                                 /* text position */
      padding: isMobile ? "0 1rem 0 0" : "0 2rem",
    }}>
      <p style={{
        fontFamily: "Courier New, monospace",
        fontSize: "11px",
        color: "var(--color-amber)",
        textTransform: "uppercase",
        letterSpacing: "0.35em",
        marginBottom: "1rem",
      }}>
        {preview.label}
      </p>
      <h3 style={{
        fontFamily: "'Bodoni Moda', serif",
        fontSize: "clamp(1.8rem, 3.5vw, 3rem)",                          /* title fontsize */
        color: "var(--color-cream)",
        fontWeight: 800,
        marginBottom: "1.25rem",
        lineHeight: 1.15,
      }}>
        {preview.title}
      </h3>
      <p style={{
        fontFamily: "Courier New, monospace",
        fontSize: "clamp(16px, 1.5vw, 25px)",                            /* text fontsize */ 
        color: "rgba(245,240,232,0.45)",
        lineHeight: 1.85,
        marginBottom: "1.5rem",
      }}>
        {preview.text}
      </p>
      <Link
        to={preview.to}
        style={{
          fontFamily: "Courier New, monospace",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "rgba(245,240,232,0.5)",
          borderBottom: "1px solid rgba(70,30,5,0.5)",
          paddingBottom: "4px",
          textDecoration: "none",
          width: "fit-content",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--color-amber)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.5)"}
      >
        Découvrir →
      </Link>
    </div>
  )

  return (
  <div style={{ marginBottom: isMobile ? "10rem" : "10rem" }}>
    <FadeIn>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : (isRight ? "row-reverse" : "row"),
        gap: isMobile ? "1.5rem" : "clamp(2rem, 8vw, 10rem)",                                              /* Gap between image and text */
        alignItems: "flex-start",                                                                          /* Aligns text and image */
      }}>
        {imageBlock}
        {textBlock}
      </div>
    </FadeIn>
  </div>
)
}

export default function Home() {
  const heroRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      heroRef.current.style.opacity = `${1 - scrollY / 500}`
      heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div style={{ background: "#020100", color: "var(--color-cream)", position: "relative", overflow: "hidden", width: "100%" }}>

      <Grain opacity={0.15} />
      <Scrollbar />

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image — blended into dark */}
      <div style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.15,          // ← controls how visible the image is (0 = invisible, 1 = full)
      zIndex: 0,
      }} />
        <Orb top="5%" left="70%" size="80vw" opacity={0.5} />
        <Orb top="60%" left="23%" size="60vw" opacity={0.2} />
        <Orb top="99%" left="99%" size="55vw" opacity={0.4} />
        <Orb top="20%" left="48%" size="35vw" opacity={0.1} />
        <Orb top="15%" left="30%" size="35vw" opacity={0.11} />

        <div ref={heroRef} className="relative z-10 px-6" style={{width: isMobile ? "85%" : "40%", maxWidth: "1200px", padding: " 1rem",position: "relative", }}>
          {/*
            ── HERO TEXT ──
                      */}
          {/* Opening quote */}
          <span style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            color: "var(--color-cream)",   // ← opacity of the quote mark
            position: "absolute",
            top: "2rem",           // ← vertical position
            left: "0.5rem",         // ← how far left of the text
            lineHeight: 1,
            userSelect: "none",
            animation: "fadeIn 1.5s ease forwards",
            animationDelay: "0.8s",
            opacity: 0,
          }}>&#8220;</span>

          <p
            style={{
              fontFamily: "Courier New, monospace",
              fontStyle: "normal",
              fontSize: "clamp(0.9rem, 1vw, 1.5rem)",      /* Min / Preferred / Max */
              lineHeight: 1.5,
              color: "var(--color-cream)",
              paddingTop: "6rem",   // ← increase to move down, decrease to move up
              textAlign: isMobile ? "left" : "justify",
              animation: "fadeIn 1.5s ease forwards",
              animationDelay: "0.8s",
              opacity: 0,
            }}
          >
            Cultivé sur les hauts plateaux du sud Vietnam ou dans ses montagnes
            septentrionales, récolté et trié avec soin, nettoyé, séché et sélectionné,
            torréfié par des experts pour révéler toutes ses saveurs exotiques...
            <br /><br />
            Jusqu'à votre tasse.
          </p>
          {/* Closing quote */}
          <span style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            color: "var(--color-cream)",
            position: "absolute",
            bottom: "-3rem",       // ← vertical position
            right: "0.5rem",        // ← how far right of the text
            lineHeight: 1,
            userSelect: "none",
            animation: "fadeIn 1.5s ease forwards",
            animationDelay: "0.8s",
            opacity: 0,
            transform: "rotate(180deg)",
            display: "inline-block",   // ← needed for transform to work on inline element
          }}>&#8220;</span>
        </div>
      </section>

      {/* ── PRODUITS EN AVANT ── */} 
      <section className="relative py-120 px-6 overflow-hidden">
        <Orb top="30%" left="80%" size="50vw" opacity={0.18} />
        <Orb top="80%" left="10%" size="40vw" opacity={0.12} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p style={{
                fontFamily: "Courier New, monospace",
                fontSize: "11px",
                color: "var(--color-amber)",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                marginBottom: "1rem",
              }}>
                Produits en avant
              </p>
              <h2 style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--color-cream)",
                fontWeight: 800,
              }}>
                {/*Trois origines, une exigence*/}
              </h2>
            </div>
          </FadeIn> 

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCoffees.map((coffee, i) => (
              <FeaturedCoffeeCard key={coffee.name} coffee={coffee} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(245,240,232,0.4)",
                borderBottom: "1px solid rgba(70,30,5,0.5)",
                paddingBottom: "4px",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--color-amber)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.4)"}
            >
              Voir tous nos produits →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION PREVIEWS — alternating left/right ── */}
        <section className="relative py-2 px-6 overflow-hidden">
        <Orb top="15%" left="30%" size="45vw" opacity={0.1} />    
        <Orb top="30%" left="30%" size="45vw" opacity={0.1} /> 
        <Orb top="45%" left="60%" size="45vw" opacity={0.1} />
        <Orb top="60%" left="90%" size="45vw" opacity={0.1} />
        <Orb top="80%" left="25%" size="40vw" opacity={0.08} />
        <div className="relative z-10 max-w-4xl mx-auto w-full">
            {sectionPreviews.map((preview, i) => (
            <SectionPreview key={preview.label} preview={preview} index={i} isMobile={isMobile} />
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA — centered, no image ── */}
      <section className="relative py-70 px-6 overflow-hidden">
        <Orb top="50%" left="50%" size="50vw" opacity={0.15} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <FadeIn>
            <p style={{
              fontFamily: "Courier New, monospace",
              fontSize: "11px",
              color: "var(--color-amber)",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              marginBottom: "1.5rem",
            }}>
              Contact
            </p>
            <h2 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-cream)",
              fontWeight: 800,
              marginBottom: "2rem",
              lineHeight: 1.15,
            }}>
              Contactez-nous
            </h2>
            <p style={{
              fontFamily: "Courier New, monospace",
              fontSize: "14px",
              color: "rgba(245,240,232,0.4)",
              lineHeight: 1.85,
              marginBottom: "2.5rem",
            }}>
              Une question, un projet, une commande ? Nous sommes à votre écoute.
            </p>
            <Link
              to="/contact"
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--color-cream)",
                background: "rgba(138,43,11,0.2)",
                border: "1px solid rgba(138,43,11,0.5)",
                padding: "0.9rem 2.5rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(138,43,11,0.4)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(138,43,11,0.2)"}
            >
              Nous écrire →
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

    </div>
  )
}
