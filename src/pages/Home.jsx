import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import coffee1 from "../assets/coffee1.png"
import coffee2 from "../assets/coffee2.png"
import coffee3 from "../assets/coffee3.png"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"


// orb background blob
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

const features = [
  {
    icon: "🌿",
    title: "Vietnamese Origins",
    text: "Sourced from the highlands of Vietnam, where ideal conditions produce exceptional coffee.",
  },
  {
    icon: "☕",
    title: "Expertly Roasted",
    text: "Partnering with local roasters who have perfected their craft across generations.",
  },
  {
    icon: "📦",
    title: "Delivered to You",
    text: "From the mountains of Vietnam straight to your cup, anywhere in France.",
  },
]

const products = [
  {
    name: "Robusta Dark",
    origin: "Dak Lak, Vietnam",
    note: "Bold · Earthy · Strong",
    image: coffee1,
  },
  {
    name: "Arabica Light",
    origin: "Da Lat, Vietnam",
    note: "Floral · Bright · Smooth",
    image: coffee2,
  },
  {
    name: "Blend Signature",
    origin: "Vietnam",
    note: "Balanced · Rich · Complex",
    image: coffee3,
  },
]

export default function Home() {
  const heroRef = useRef(null)

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
    <div style={{ background: "#020100", color: "#f5f0e8", position: "relative", overflow: "hidden", width: "100%" }}>

      <Grain opacity={0.15} />
      <Scrollbar />

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Orb top="5%" left="70%" size="80vw" opacity={0.5} />
        <Orb top="60%" left="23%" size="60vw" opacity={0.2} />
        <Orb top="99%" left="99%" size="55vw" opacity={0.4} />
        <Orb top="20%" left="48%" size="35vw" opacity={0.1} />
        <Orb top="15%" left="30%" size="35vw" opacity={0.11} />

        <div ref={heroRef} className="relative z-10 text-center">
          <h1 style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: "clamp(5rem, 15vw, 14rem)",
                color: "#f5f0e8",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                fontWeight: 800,
                fontStyle: "italic",}}
                >
                </h1>
        </div>
      {/* ── HERO POEM ── */}
<div
  className="absolute z-10 w-full"
  style={{
    bottom: "40%",
    display: "flex",
    flexDirection: "column",  // stacked by default (mobile first)
    alignItems: "center",
    gap: "2rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  }}
>
  <style>{`
    @media (min-width: 768px) {
      .poem-wrapper {
        flex-direction: row !important;
        align-items: flex-start !important;
        padding-left: 23vw !important;
        padding-right: 19vw !important;
        gap: 4vw !important;
      }
      .poem-block {
        text-align: left !important;
      }
    }
  `}</style>

  <div className="poem-wrapper" style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
  }}>

    {/* Vietnamese — left on desktop, top on mobile */}
    <div className="poem-block" style={{
      fontFamily: "Courier New, monospace",
      fontStyle: "italic",
      textAlign: "center",
      animation: "fadeIn 1.5s ease forwards",
      animationDelay: "0.3s",
      opacity: 0,
    }}>
      {[
        "Đất nâu ôm giọt mưa rơi,",
        "Người đi gieo hạt giữa trời mênh mông,",
        "Hương cà phê thức trong lòng,",
        "Sớm mai tỉnh giấc, ấm nồng nhân gian.",
      ].map((line, i) => (
        <p key={i} style={{
          color: "#f5f0e8",
          fontSize: "clamp(0.75rem, 1vw, 1.5rem)",
          lineHeight: "2",
          margin: 0,
          whiteSpace: "nowrap",
        }}>{line}</p>
      ))}
    </div>

    {/* French — right on desktop, bottom on mobile */}
    <div className="poem-block" style={{
      fontFamily: "Courier New, monospace",
      fontStyle: "italic",
      textAlign: "center",
      animation: "fadeIn 1.5s ease forwards",
      animationDelay: "0.3s",
      opacity: 0,
    }}>
      {[
        "La terre brune accueille la pluie qui tombe,",
        "L'homme sème au cœur du ciel immense,",
        "Le parfum du café s'éveille en lui,",
        "Et l'aube réchauffe doucement le monde.",
      ].map((line, i) => (
        <p key={i} style={{
          color: "#f5f0e8",
          fontSize: "clamp(0.75rem, 1vw, 2rem)",
          lineHeight: "2",
          margin: 0,
          whiteSpace: "nowrap",
        }}>{line}</p>
      ))}
    </div>

  </div>
</div>
      </section>

      {/* ── MISSION ── */}
      <section className="relative py-40 px-6 flex items-center justify-center overflow-hidden">
        <Orb top="50%" left="50%" size={800} opacity={0.15} />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="font-mono text-stone-500 uppercase tracking-[0.4em] text-xs mb-8">
            Our mission
          </p>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#f5f0e8",
            }}
          >
            Bringing the finest Vietnamese coffee to your table
          </h2>
          <div className="w-12 h-px bg-amber-800/60 mx-auto mt-10" />
          <p className="font-mono text-stone-500 text-sm leading-relaxed mt-8">
            Vietnam is the world's second largest coffee producer, yet its exceptional
            quality remains largely unknown in Europe. Caphein is changing that.
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Orb top="50%" left="20%" size={900} opacity={0.12} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="font-mono text-stone-500 uppercase tracking-[0.4em] text-xs text-center mb-16">
            Why caphein
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-3xl mb-6">{f.icon}</div>
                <h3
                  className="font-bold mb-4"
                  style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.2rem", color: "#f5f0e8" }}
                >
                  {f.title}
                </h3>
                <p className="font-mono text-stone-500 text-xs leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Orb top="30%" left="80%" size={600} opacity={0.2} />
        <Orb top="80%" left="10%" size={500} opacity={0.15} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-stone-500 uppercase tracking-[0.4em] text-xs mb-4">
              Our selection
            </p>
            <h2
              className="font-bold"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8" }}
            >
              Three coffees, one origin
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.name}
                className="group cursor-pointer"
                style={{
                  border: "1px solid rgba(70,30,5,0.3)",
                  background: "rgba(70,30,5,0.06)",
                  backdropFilter: "blur(4px)",
                  transition: "border-color 0.4s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(120,53,15,0.6)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(70,30,5,0.3)"}
              >
                <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                <div className="p-6 text-center">
                  <p className="font-mono text-amber-800 text-xs uppercase tracking-widest mb-2">{p.origin}</p>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.3rem", color: "#f5f0e8" }}
                  >
                    {p.name}
                  </h3>
                  <p className="font-mono text-stone-600 text-xs">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="font-mono text-xs uppercase tracking-widest text-stone-400 hover:text-amber-700 transition-colors duration-300"
              style={{ borderBottom: "1px solid rgba(70,30,5,0.5)", paddingBottom: "4px" }}
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR STORY TEASER ── */}
      <section className="relative py-40 px-6 overflow-hidden">
        <Orb top="50%" left="50%" size={700} opacity={0.2} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-mono text-stone-500 uppercase tracking-[0.4em] text-xs mb-8">
            Our story
          </p>
          <h2
            className="font-bold leading-tight mb-10"
            style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f5f0e8" }}
          >
            Born in the highlands of Vietnam
          </h2>
          <p className="font-mono text-stone-500 text-sm leading-relaxed mb-12">
            From the terraced fields of Dak Lak to the artisan roasters of Da Lat,
            every bag of Caphein carries the story of the people who grew it.
          </p>
          <Link
            to="/our-story"
            className="font-mono text-xs uppercase tracking-widest text-stone-400 hover:text-amber-700 transition-colors duration-300"
            style={{ borderBottom: "1px solid rgba(70,30,5,0.5)", paddingBottom: "4px" }}
          >
            Read our story →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-16 px-6 overflow-hidden">
        <Orb top="70%" left="99%" size={600} opacity={0.15} />
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">
          <span
            className="font-bold"
            style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "2rem", color: "#f5f0e8" }}
          >
            caphein
          </span>
          <div className="flex gap-10 font-mono text-stone-600 text-xs uppercase tracking-widest">
            <Link to="/our-story" className="hover:text-amber-700 transition-colors">Histoire</Link>
            <Link to="/culture" className="hover:text-amber-700 transition-colors">Culture</Link>
            <Link to="/products" className="hover:text-amber-700 transition-colors">Produits</Link>
            <Link to="/contact" className="hover:text-amber-700 transition-colors">Contact</Link>
          </div>
          <p className="font-mono text-stone-700 text-xs">
            © 2025 Caphein. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}