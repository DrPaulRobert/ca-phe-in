import { useEffect, useRef } from "react"

export default function Grain({ opacity = 0.04, size = 1.5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw()
    }

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  )
}