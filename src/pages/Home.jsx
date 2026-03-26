import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

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
    bg: "bg-stone-800",
  },
  {
    name: "Arabica Light",
    origin: "Da Lat, Vietnam",
    note: "Floral · Bright · Smooth",
    bg: "bg-amber-900",
  },
  {
    name: "Blend Signature",
    origin: "Vietnam",
    note: "Balanced · Rich · Complex",
    bg: "bg-stone-700",
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const taglineRef = useRef(null)
  const titleRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
  const els = [taglineRef.current, scrollRef.current] // titleRef.current
  
  // First set all elements to invisible immediately
  els.forEach((el) => {
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(40px)"
  })

  // Then animate each one with a proper staggered delay
  els.forEach((el, i) => {
    if (!el) return
    setTimeout(() => {
      el.style.transition = "opacity 1.2s ease, transform 1.2s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, 300 + i * 500) // 300ms, 800ms, 1300ms
  })
}, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
      heroRef.current.style.opacity = `${1 - scrollY / 600}`
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-stone-950 text-stone-100">

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950" />

        {/* Animated steam lines */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center gap-8 pointer-events-none">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                height: `${20 + i * 6}vh`,
                width: "1px",
                background: `linear-gradient(to top, rgba(217,119,6,0.3), transparent)`,
                animation: `pulse ${2 + i * 0.3}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            ref={taglineRef}
            className="text-amber-400 uppercase tracking-[0.5em] text-xs mb-8 font-mono"
          >
            From Vietnam to your cup
          </p>

          <h1
            ref={titleRef}
            className="text-8xl md:text-[10rem] font-serif text-amber-50 tracking-tight leading-none mb-12"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Cà Phê In
          </h1>

          <div ref={scrollRef} className="flex flex-col items-center gap-3">
            <Link
              to="/products"
              className="border border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-stone-950 px-10 py-3 text-xs uppercase tracking-widest transition-all duration-300 font-mono"
            >
              Discover our coffees
            </Link>
            <p className="text-stone-500 text-xs uppercase tracking-widest mt-6 animate-bounce">
              scroll down
            </p>
          </div>
        </div>
      </section>

      {/* TAGLINE SECTION */}
      <section className="py-32 px-6 text-center max-w-3xl mx-auto">
        <p className="text-stone-400 uppercase tracking-[0.4em] text-xs mb-6 font-mono">
          Our mission
        </p>
        <h2
          className="text-4xl md:text-5xl font-serif text-amber-100 leading-tight mb-8"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          Bringing the finest Vietnamese coffee to your table
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed font-mono">
          Vietnam is the world's second largest coffee producer, yet its exceptional quality
          remains largely unknown in Europe. Ca Phe In is changing that — one cup at a time.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="text-amber-100 text-lg font-serif mb-3" style={{ fontFamily: "'Bodoni Moda', serif" }}>{f.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed font-mono">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS PREVIEW SECTION */}
      <section className="py-32 px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 uppercase tracking-[0.4em] text-xs mb-4 font-mono">
              Our selection
            </p>
            <h2
              className="text-4xl font-serif text-amber-100"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Three coffees, one origin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.name}
                className={`${p.bg} p-10 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-500 cursor-pointer`}
              >
                {/* Placeholder coffee bag illustration */}

                <div className="w-20 h-28 bg-stone-950/40 rounded-sm mb-8 flex items-center justify-center">
                  <span className="text-4xl">☕</span>
                </div>
                <p className="text-amber-400 text-xs uppercase tracking-widest font-mono mb-2">
                  {p.origin}
                </p>
                <h3
                  className="text-amber-50 text-xl font-serif mb-3"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {p.name}
                </h3>
                <p className="text-stone-400 text-xs font-mono">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="border border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-stone-950 px-10 py-3 text-xs uppercase tracking-widest transition-all duration-300 font-mono inline-block"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ORIGIN STORY TEASER */}
      <section className="py-32 px-6 border-t border-stone-800 bg-amber-950/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 uppercase tracking-[0.4em] text-xs mb-6 font-mono">
            Our story
          </p>
          <h2
            className="text-4xl md:text-5xl font-serif text-amber-100 leading-tight mb-8"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Born in the highlands of Vietnam
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed font-mono mb-10">
            From the terraced fields of Dak Lak to the artisan roasters of Da Lat,
            every bag of Ca Phe In carries the story of the people who grew it.
          </p>
          <Link
            to="/our-story"
            className="border border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-stone-950 px-10 py-3 text-xs uppercase tracking-widest transition-all duration-300 font-mono inline-block"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-800 py-12 px-6 text-center">
        <p
          className="text-amber-100 text-2xl font-serif mb-4"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          Ca Phe In
        </p>
        <p className="text-stone-500 text-xs font-mono uppercase tracking-widest mb-6">
          From Vietnam to your cup
        </p>
        <div className="flex justify-center gap-8 text-stone-500 text-xs font-mono uppercase tracking-widest">
          <Link to="/our-story" className="hover:text-amber-400 transition-colors">Our Story</Link>
          <Link to="/products" className="hover:text-amber-400 transition-colors">Products</Link>
          <Link to="/services" className="hover:text-amber-400 transition-colors">Services</Link>
          <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
        </div>
        <p className="text-stone-700 text-xs font-mono mt-8">
          © 2025 Ca Phe In. All rights reserved.
        </p>
      </footer>

    </div>
  )
}