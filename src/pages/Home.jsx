import { useEffect, useRef } from "react"

export default function Home() {
  const taglineRef = useRef(null)
  const subRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const els = [taglineRef.current, subRef.current, scrollRef.current]
    els.forEach((el, i) => {
      if (!el) return
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = `opacity 1s ease ${i * 0.4}s, transform 1s ease ${i * 0.4}s`
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, 100)
    })
  }, [])

  return (
    <div className="relative min-h-screen bg-stone-950 flex flex-col items-center justify-center overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950 opacity-80" />

      {/* Decorative steam lines */}
      <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="mx-3 w-px bg-gradient-to-t from-amber-400/20 to-transparent"
            style={{
              height: `${30 + i * 8}%`,
              animation: `pulse ${2 + i * 0.4}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6">

        <p
          ref={taglineRef}
          className="text-stone-400 uppercase tracking-[0.4em] text-xs mb-6 font-mono"
        >
          From Vietnam to your cup
        </p>

        <h1
          ref={subRef}
          className="text-amber-100 text-7xl md:text-9xl font-serif tracking-tight leading-none mb-10"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          Cà Phê In
        </h1>

        <p
          ref={scrollRef}
          className="text-stone-400 uppercase tracking-[0.3em] text-xs"
        >
          ↓ Scroll to discover
        </p>
      </div>

      {/* Second section teaser */}
      <div className="absolute bottom-0 left-0 w-full py-16 flex flex-col items-center z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-amber-700/40" />
      </div>
    </div>
  )
}