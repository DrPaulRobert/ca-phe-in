import { useEffect, useState, useRef, useCallback } from "react"

// Desktop-only scrollbar — hidden on mobile
function ScrollbarDesktop() {
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(40)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)
  const trackRef = useRef(null)

  const update = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const trackHeight = trackRef.current
      ? trackRef.current.getBoundingClientRect().height
      : window.innerHeight - 40

    const ratio = window.innerHeight / document.documentElement.scrollHeight
    const newThumbHeight = Math.max(20, ratio * trackHeight*0.5) // Taille du thumb
    setThumbHeight(newThumbHeight)

    const scrollRatio = docHeight > 0 ? scrollTop / docHeight : 0
    setThumbTop(scrollRatio * (trackHeight - newThumbHeight))
  }, [])

  useEffect(() => {
    update()
    window.addEventListener("scroll", update)
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  // ── DRAG HANDLERS ──
  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    isDragging.current = true
    dragStartY.current = e.clientY
    dragStartScroll.current = window.scrollY
    document.body.style.userSelect = "none"  // prevents text selection while dragging
  }, [])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging.current) return
      const trackHeight = trackRef.current
        ? trackRef.current.getBoundingClientRect().height
        : window.innerHeight - 40
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const deltaY = e.clientY - dragStartY.current
      const scrollDelta = (deltaY / (trackHeight - thumbHeight)) * docHeight
      window.scrollTo(0, dragStartScroll.current + scrollDelta)
    }

    const onMouseUp = () => {
      isDragging.current = false
      document.body.style.userSelect = ""
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [thumbHeight])

  return (
    <div style={{
      position: "fixed",
      right: "1.5rem",  // ← horizontal position, adjust to move left/right    SCROLLBAR
      top: "10rem",               // ← distance from top of screen
      bottom: "5rem",            // ← distance from bottom of screen
      height: "auto",
      width: "1px",              // ← track thickness
      zIndex: 9998,
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* Top dot */}
      <div style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "rgba(245,240,232,1)",
        flexShrink: 0,
        marginBottom: "4px",
      }} />

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          flex: 1,
          width: "2px",
          background: "rgba(245,240,232,0.2)",  // ← track line color
          position: "relative",
        }}
      >
        {/* Thumb */}
        <div
          onMouseDown={onMouseDown}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: thumbTop,
            width: "5px",              // ← thumb width
            height: thumbHeight,
            background: "#f5f0e8",     // ← thumb color
            borderRadius: "2px",
            cursor: "grab",
            pointerEvents: "all",      // thumb is clickable even though parent is not
            transition: isDragging.current ? "none" : "top 0.05s linear",
          }}
        />
      </div>

      {/* Bottom dot */}
      <div style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "rgba(245,240,232,1)",
        flexShrink: 0,
        marginTop: "4px",
      }} />

    </div>
  )
}

// ─── EXPORTED COMPONENT — renders nothing on mobile ──────────────────────────
export default function Scrollbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isMobile) return null
  return <ScrollbarDesktop />
}