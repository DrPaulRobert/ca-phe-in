import { useState, useRef } from "react"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"
import Footer from "../components/Footer"
import { useEffect } from "react"

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
    <div ref={ref} style={{
      opacity: 0,
      transform: "translateY(28px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

// ─── CONTACT INFO ITEM ────────────────────────────────────────────────────────
function ContactItem({ icon, label, value, href }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "2rem",
        border: `1px solid ${hovered ? "rgba(194,68,15,0.6)" : "rgba(70,30,5,0.3)"}`,
        background: hovered ? "rgba(138,43,11,0.08)" : "transparent",
        transition: "all 0.3s ease",
        flex: 1,
      }}
    >
      <span>{icon}</span>
      <p style={{
        fontFamily: "Courier New, monospace",
        fontSize: "10px",
        color: "rgba(194,68,15,0.8)",
        textTransform: "uppercase",
        letterSpacing: "0.35em",
        margin: 0,
      }}>{label}</p>
      <p style={{
        fontFamily: "'Bodoni Moda', serif",
        fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
        color: "var(--color-cream)",
        fontWeight: 700,
        margin: 0,
        lineHeight: 1.2,
      }}>{value}</p>
    </a>
  )
}

// ─── PILL SELECTOR ────────────────────────────────────────────────────────────
function PillSelector({ value, onChange }) {
  const options = ["Business", "Particulier"]
  return (
    <div style={{ display: "flex", gap: "0" }}>
      {options.map((opt, i) => {
        const isActive = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              padding: "0.75rem 2rem",
              border: "1px solid rgba(70,30,5,0.4)",
              borderRight: i === 0 ? "none" : "1px solid rgba(70,30,5,0.4)",
              background: isActive ? "rgba(138,43,11,0.25)" : "transparent",
              color: isActive ? "var(--color-cream)" : "rgba(245,240,232,0.35)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ─── INPUT STYLES ─────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%",
  background: "rgba(70,30,5,0.06)",
  border: "1px solid rgba(70,30,5,0.35)",
  color: "var(--color-cream)",
  fontFamily: "Courier New, monospace",
  fontSize: "14px",
  padding: "1rem 1.25rem",
  outline: "none",
  transition: "border-color 0.3s ease",
  boxSizing: "border-box",
  resize: "none",
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Contact() {
  const [profileType, setProfileType] = useState("Business")
  const [email,       setEmail]       = useState("")
  const [message,     setMessage]     = useState("")
  const [submitted,   setSubmitted]   = useState(false)
  const [submitting,  setSubmitting]  = useState(false)
  const [error,       setError]       = useState(null)

  // ── NETLIFY FORM SUBMIT ────────────────────────────────────────────────────
  // Netlify Forms detects the hidden HTML form at build time.
  // On submit, we POST to the same URL with form-encoded data.
  // Netlify intercepts it, stores the submission, and forwards to your email.
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Build the subject line: [Business] jean@example.com
    const subject = `[${profileType}] ${email}`

    try {
      const formData = new URLSearchParams()
      formData.append("form-name", "contact")       // must match the hidden form name
      formData.append("profile",   profileType)
      formData.append("email",     email)
      formData.append("subject",   subject)
      formData.append("message",   message)

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail("")
        setMessage("")
        setProfileType("Business")
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.")
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      background: "#020100", color: "var(--color-cream)",
      position: "relative", width: "100%", minHeight: "100vh",
    }}>

      <Grain opacity={0.15} />
      <Scrollbar />

      {/*
        ── NETLIFY HIDDEN FORM ───────────────────────────────────────────────
        Netlify scans the HTML at build time to detect forms.
        This hidden form must exist in the DOM for Netlify to register it.
        It is invisible to the user — the real form below handles the UI.
      */}
      <form name="contact" data-netlify="true" hidden>
        <input type="text"  name="profile" />
        <input type="email" name="email"   />
        <input type="text"  name="subject" />
        <textarea           name="message" />
      </form>

      {/* ── PAGE HEADER ── */}
      <section className="relative pt-48 pb-16 px-6 overflow-hidden">
        <Orb top="10%" left="80%" size="55vw" opacity={0.2} />
        <Orb top="80%" left="10%" size="40vw" opacity={0.1} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn>
            <p style={{
              fontFamily: "Courier New, monospace",
              fontSize: "11px",
              color: "rgba(194,68,15,0.9)",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              marginBottom: "1.5rem",
            }}>
              Contact
            </p>
            <h1 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--color-cream)",
              fontWeight: 800,
              lineHeight: 1,
              marginBottom: "1.5rem",
            }}>
              Parlons café
            </h1>
            <p style={{
              fontFamily: "Courier New, monospace",
              fontSize: "15px",
              color: "rgba(245,240,232,0.4)",
              maxWidth: "420px",
              lineHeight: 1.85,
            }}>
              Une question, un projet, une commande ? Retrouvez-nous
              sur Instagram ou écrivez-nous directement.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT INFO — Instagram + Email ── */}
      <section className="relative px-6 pb-16 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <ContactItem
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="var(--color-cream)" strokeWidth="1.5" fill="none"/>
                    <circle cx="12" cy="12" r="5" stroke="var(--color-cream)" strokeWidth="1.5" fill="none"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="var(--color-cream)"/>
                  </svg>
                }
                label="Instagram"
                value="@caphein_original"
                href="https://instagram.com/caphein_original"
              />
              <ContactItem
                icon="✉"
                label="Email"
                value="caphein.contact@gmail.com"
                href="mailto:caphein.contact@gmail.com"     /*Only occurences of mail address*/
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="relative px-6 pb-32 overflow-hidden">
        <Orb top="50%" left="50%" size="60vw" opacity={0.1} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn delay={0.15}>

            {/* Divider */}
            <div style={{
              width: "48px", height: "1px",
              background: "rgba(138,43,11,0.5)",
              marginBottom: "3rem",
            }} />

            <p style={{
              fontFamily: "Courier New, monospace",
              fontSize: "11px",
              color: "rgba(194,68,15,0.9)",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              marginBottom: "2.5rem",
            }}>
              Envoyer un message
            </p>

            {submitted ? (
              /* ── SUCCESS STATE ── */
              <div style={{
                padding: "3rem 2rem",
                border: "1px solid rgba(70,30,5,0.3)",
                background: "rgba(138,43,11,0.06)",
                textAlign: "center",
                animation: "fadeInMsg 0.5s ease forwards",
              }}>
                <p style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: "1.8rem",
                  color: "var(--color-cream)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}>
                  Message envoyé
                </p>
                <p style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "14px",
                  color: "rgba(245,240,232,0.4)",
                  lineHeight: 1.8,
                }}>
                  Nous vous répondrons dans les meilleurs délais
                  à l'adresse {email || "indiquée"}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: "2rem",
                    fontFamily: "Courier New, monospace",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "rgba(245,240,232,0.4)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(70,30,5,0.4)",
                    paddingBottom: "3px",
                  }}
                >
                  Envoyer un autre message
                </button>
              </div>

            ) : (
              /* ── FORM ── */
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >

                {/* Step 1 — Profile type */}
                <div>
                  <label style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}>
                    Vous êtes un
                  </label>
                  <PillSelector value={profileType} onChange={setProfileType} />
                </div>

                {/* Step 2 — Email */}
                <div>
                  <label style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}>
                    Votre email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(194,68,15,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(70,30,5,0.35)"}
                  />
                </div>

                {/* Step 3 — Message */}
                <div>
                  <label style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}>
                    Votre message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Décrivez votre projet, votre besoin..."
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(194,68,15,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(70,30,5,0.35)"}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "12px",
                    color: "rgba(194,68,15,0.8)",
                    margin: 0,
                  }}>
                    {error}
                  </p>
                )}

                {/* Submit */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      fontFamily: "Courier New, monospace",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      color: submitting ? "rgba(245,240,232,0.25)" : "var(--color-cream)",
                      background: submitting ? "transparent" : "rgba(138,43,11,0.2)",
                      border: "1px solid rgba(138,43,11,0.5)",
                      padding: "0.9rem 2.5rem",
                      cursor: submitting ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => { if (!submitting) e.target.style.background = "rgba(138,43,11,0.4)" }}
                    onMouseLeave={e => { if (!submitting) e.target.style.background = "rgba(138,43,11,0.2)" }}
                  >
                    {submitting ? "Envoi en cours..." : "Envoyer →"}
                  </button>
                </div>

              </form>
            )}

          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes fadeInMsg {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Placeholder color */
        ::placeholder {
          color: rgba(245,240,232,0.2);
          font-family: Courier New, monospace;
        }
      `}</style>

      <Footer />

    </div>
  )
}
