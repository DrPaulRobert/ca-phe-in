import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Grain from "../components/Grain"
import Scrollbar from "../components/Scrollbar"
import Footer from "../components/Footer"

// ─── MOBILE DETECTION ────────────────────────────────────────────────────────
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
      { threshold: 0.1 }
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

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "Courier New, monospace",
      fontSize: "11px",
      color: "rgba(194,68,15,0.9)",
      textTransform: "uppercase",
      letterSpacing: "0.4em",
      marginBottom: "1.5rem",
    }}>{children}</p>
  )
}

// ─── BODY TEXT ────────────────────────────────────────────────────────────────
function BodyText({ children, style = {} }) {
  return (
    <p style={{
      fontFamily: "Courier New, monospace",
      fontSize: "15px",
      color: "rgba(245,240,232,0.6)",
      lineHeight: 1.9,
      marginBottom: "1.25rem",
      ...style,
    }}>{children}</p>
  )
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      width: "48px", height: "1px",
      background: "rgba(138,43,11,0.5)",
      margin: "4rem 0",
    }} />
  )
}

// ─── IMAGE PLACEHOLDER ───────────────────────────────────────────────────────
function ImagePlaceholder({ hint, aspectRatio = "16/9" }) {
  return (
    <div style={{
      width: "100%",
      aspectRatio,
      background: "radial-gradient(ellipse at 40% 40%, rgba(138,43,11,0.2) 0%, #0a0604 80%)",
      border: "1px solid rgba(70,30,5,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      marginBottom: "2rem",
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
        <span style={{ opacity: 0.6 }}>({hint})</span>
      </p>
    </div>
  )
}

// ─── STARS ───────────────────────────────────────────────────────────────────
function Stars({ count, max = 3 }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{
          fontSize: "14px",
          color: i < count ? "#c2440f" : "rgba(245,240,232,0.15)",
        }}>★</span>
      ))}
    </div>
  )
}

// ─── SUGAR LEVEL ─────────────────────────────────────────────────────────────
function SugarLevel({ level }) {
  const labels = { low: "Faible", medium: "Moyen", high: "Élevé" }
  const colors = {
    low:    "rgba(194,68,15,0.5)",
    medium: "rgba(194,68,15,0.75)",
    high:   "#c2440f",
  }
  return (
    <span style={{
      fontFamily: "Courier New, monospace",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.2em",
      color: colors[level],
      border: `1px solid ${colors[level]}`,
      padding: "2px 8px",
    }}>
      {labels[level]} {/* Sucre : {labels[level]} */}
    </span>
  )
}

// ─── RECIPE CARD ─────────────────────────────────────────────────────────────
function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn>
      <div style={{
        border: "1px solid rgba(70,30,5,0.3)",
        background: "rgba(70,30,5,0.04)",
        marginBottom: "2rem",
      }}>
        {/* Image placeholder */}
        <ImagePlaceholder hint={recipe.imagehint} aspectRatio="16/9" />

        <div style={{ padding: "2rem" }}>
          {/* Header */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{
              fontFamily: "Courier New, monospace",
              fontSize: "11px",
              color: "rgba(194,68,15,0.85)",
              textTransform: "uppercase",
              letterSpacing: "0.35em",
              marginBottom: "0.5rem",
            }}>{recipe.vietnamese}</p>
            <h3 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(1.4rem, 2vw, 2rem)",
              color: "var(--color-cream)",
              fontWeight: 800,
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}>{recipe.name}</h3>
            <BodyText>{recipe.story}</BodyText>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <p style={{ fontFamily: "Courier New, monospace", fontSize: "10px", color: "rgba(245,240,232,0.3)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>Difficulté</p>
              <Stars count={recipe.difficulty} />
            </div>
            <div>
              <p style={{ fontFamily: "Courier New, monospace", fontSize: "10px", color: "rgba(245,240,232,0.3)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>Sucre</p>
              <SugarLevel level={recipe.sugar} />
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: open ? "var(--color-cream)" : "rgba(245,240,232,0.4)",
              background: "transparent",
              border: "1px solid rgba(70,30,5,0.4)",
              padding: "0.6rem 1.2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginBottom: open ? "1.5rem" : "0",
            }}
          >
            {open ? "Masquer la recette ↑" : "Voir la recette ↓"}
          </button>

          {/* Expandable recipe */}
          {open && (
            <div style={{ animation: "fadeInRecipe 0.3s ease forwards", opacity: 0 }}>
              {/* Ingredients */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "11px",
                  color: "rgba(194,68,15,0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  marginBottom: "0.75rem",
                }}>Ingrédients</p>
                {recipe.ingredients.map((ing, i) => (
                  <p key={i} style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "13px",
                    color: "rgba(245,240,232,0.5)",
                    lineHeight: 1.8,
                    paddingLeft: "1rem",
                    borderLeft: "1px solid rgba(70,30,5,0.3)",
                  }}>— {ing}</p>
                ))}
              </div>

              {/* Steps */}
              <div>
                <p style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "11px",
                  color: "rgba(194,68,15,0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  marginBottom: "0.75rem",
                }}>Préparation</p>
                {recipe.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: "1.2rem",
                      color: "rgba(194,68,15,0.5)",
                      fontWeight: 800,
                      flexShrink: 0,
                      lineHeight: 1.5,
                    }}>{i + 1}</span>
                    <p style={{
                      fontFamily: "Courier New, monospace",
                      fontSize: "13px",
                      color: "rgba(245,240,232,0.5)",
                      lineHeight: 1.8,
                    }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const phinSteps = [
  {
    title: "Préparez le phin et le café",
    text: "Utilisez environ 20 g de café moulu moyen-fin, de préférence un Robusta vietnamien torréfié foncé. Démontez le phin (4 pièces : chambre, filtre perforé, pressoir et couvercle) et posez-le sur votre tasse ou verre.",
    imagehint: "phin démonté sur une surface",
  },
  {
    title: "Préchauffez le phin",
    text: "Versez un peu d'eau chaude (90-95°C) dans la chambre du phin vide pour le préchauffer. Videz l'eau après quelques secondes. Cela stabilise la température et améliore l'extraction.",
    imagehint: "eau chaude versée dans le phin",
  },
  {
    title: "Ajoutez le café et tassez légèrement",
    text: "Versez le café moulu dans la chambre. Placez le pressoir sur les grains et appuyez légèrement, sinon l'eau ne passera pas. Le pressoir doit reposer sur le café sans pression excessive.",
    imagehint: "pressoir placé sur le café",
  },
  {
    title: "La floraison (bloom)",
    text: "Versez environ 30 ml d'eau chaude et attendez 45 secondes. Cette étape permet au café de dégazer et prépare les grains à une extraction optimale. Vous verrez le café gonfler légèrement.",
    imagehint: "café qui gonfle pendant le bloom",
  },
  {
    title: "Remplissez et patientez",
    text: "Remplissez le reste de la chambre avec de l'eau chaude (environ 150-180 ml). Posez le couvercle et laissez le café s'égoutter lentement. Le processus prend entre 4 et 7 minutes, c'est la lenteur qui fait la richesse du phin.",
    imagehint: "phin en cours d'égouttage sur un verre",
  },
  {
    title: "Servez",
    text: "Retirez le phin. Votre café est prêt à être dégusté noir, avec de la glace, ou sur du lait concentré sucré déjà versé dans la tasse. Remuez bien avant de boire.",
    imagehint: "tasse de café vietnamien prête à boire",
  },
]

const recipes = [
  {
    vietnamese: "Cà Phê Trứng",
    name: "Café à l'œuf",
    story: "Né en 1946 à Hanoi, pendant une période de pénurie de lait, Nguyễn Văn Giảng — barman au prestigieux Hôtel Métropole — eut l'idée de remplacer le lait par des jaunes d'œufs fouettés avec du sucre et du lait concentré. Le résultat : une crème dorée, soyeuse, posée sur un café Robusta corsé. Le Cà Phê Giảng, son café, existe toujours dans le vieux quartier de Hanoi et sert encore la recette originale.",
    difficulty: 3,
    sugar: "high",
    imagehint: "café à l'œuf dans une tasse, vue de dessus",
    ingredients: [
      "1 tasse de café fort préparé au phin (~80 ml)",
      "2 jaunes d'œufs frais",
      "2 cuillères à soupe de lait concentré sucré",
      "1 cuillère à café de sucre",
      "Quelques gouttes d'extrait de vanille (facultatif)",
    ],
    steps: [
      "Préparez un café fort au phin. Versez-le dans une tasse et maintenez-le chaud en posant la tasse dans un bol d'eau chaude.",
      "Dans un bol, fouettez vigoureusement les jaunes d'œufs avec le lait concentré sucré et le sucre pendant 3 à 5 minutes, jusqu'à obtenir une crème épaisse, pâle et mousseuse. Un batteur électrique facilite cette étape.",
      "Versez délicatement la crème d'œuf sur le café chaud à l'aide d'une cuillère, pour qu'elle flotte en surface sans se mélanger.",
      "Servez immédiatement. Se déguste en plongeant la cuillère pour mêler la crème au café, ou en buvant à travers la crème — au choix.",
    ],
  },
  {
    vietnamese: "Cà Phê Muối",
    name: "Café au sel",
    story: "Originaire de Hué, la ville impériale du centre du Vietnam, le café au sel a été créé en 2010 par Hồ Thị Thanh Hương et Trần Nguyễn Hữu Phong. Une pincée de sel dans la crème de lait : une idée simple qui produit quelque chose d'inattendu. Le sel atténue l'amertume du café, renforce la douceur du lait concentré et révèle des notes caramélisées que l'on ne perçoit pas autrement.",
    difficulty: 2,
    sugar: "medium",
    imagehint: "café au sel avec crème sur le dessus, vue de côté",
    ingredients: [
      "1 tasse de café préparé au phin (~80 ml)",
      "3 cuillères à soupe de lait concentré sucré",
      "3 cuillères à soupe de crème fraîche épaisse",
      "1 pincée généreuse de sel de mer fin",
      "Glaçons (pour la version froide)",
    ],
    steps: [
      "Préparez le café au phin et versez-le dans un verre avec ou sans glaçons selon votre préférence.",
      "Dans un petit bol, mélangez le lait concentré sucré, la crème fraîche et le sel. Fouettez brièvement — 30 secondes suffisent — jusqu'à obtenir une crème légèrement épaissie.",
      "Versez délicatement la crème salée sur le café à l'aide d'une cuillère à soupe retournée, pour créer une couche distincte en surface.",
      "Ne remuez pas. Buvez à travers la crème salée pour percevoir le contraste entre l'amertume du café et la douceur salée de la crème.",
    ],
  },
  {
    vietnamese: "Cà Phê Sữa Đá",
    name: "Café au lait concentré sur glace",
    story: "Le grand classique du café vietnamien, né de la colonisation française et de la nécessité. Dans les années 1850, le lait frais était rare et se gâtait rapidement sous la chaleur tropicale. Le lait concentré sucré, importé et stable à température ambiante, devint le substitut naturel. Le mariage du Robusta torréfié foncé et du lait concentré sucré, versé sur de la glace pilée, donna naissance à l'une des boissons les plus emblématiques d'Asie du Sud-Est.",
    difficulty: 1,
    sugar: "high",
    imagehint: "grand verre de café glacé avec lait concentré, condensation sur le verre",
    ingredients: [
      "1 portion de café fort préparé au phin (~80-100 ml)",
      "2 à 3 cuillères à soupe de lait concentré sucré",
      "Un grand verre de glaçons",
    ],
    steps: [
      "Versez le lait concentré sucré au fond d'un verre à whisky ou d'un grand verre.",
      "Posez le phin directement sur le verre et préparez le café — laissez-le s'égoutter directement sur le lait concentré.",
      "Une fois le café prêt, retirez le phin. Remuez brièvement pour mélanger le café et le lait.",
      "Remplissez un grand verre de glaçons. Versez le mélange café-lait sur la glace. Remuez et dégustez immédiatement.",
    ],
  },
]

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Culture() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: "#020100",
      color: "var(--color-cream)",
      position: "relative",
      width: "100%",
      minHeight: "100vh",
    }}>
      <style>{`
        @keyframes fadeInRecipe {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Grain opacity={0.15} />
      <Scrollbar />


      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — CULTURE & HISTOIRE
      ══════════════════════════════════════════════════════════════════════ */}   
      <section className="relative overflow-hidden" style={{ padding: isMobile ? "10rem 1.5rem" : "15rem 3rem" }}>  {/*15 rem → top padding*/}
        <Orb top="30%" left="90%" size="45vw" opacity={0.12} />
        <div className="relative z-10" style={{ maxWidth: "800px", margin: "0 auto" }}>

          <FadeIn>
            <SectionLabel>Histoire & Culture</SectionLabel>
            <h2 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "var(--color-cream)",
              fontWeight: 800,
              marginBottom: "2rem",
              lineHeight: 1.15,
            }}>
              Une histoire qui remonte au XIXe siècle
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ImagePlaceholder hint="plantation de café dans les hauts plateaux du Vietnam, ambiance brumeuse" aspectRatio="16/9" />
          </FadeIn>

          <FadeIn delay={0.15}>
            <BodyText>
              Le café fut introduit au Vietnam en 1857, lorsqu'un prêtre catholique français apporta un premier plant d'Arabica dans le nord du pays. La culture s'étendit rapidement dans la région d'Annam dans les années 1890, puis gagna les hauts plateaux du centre — le Tây Nguyên — où le sol volcanique, l'altitude et le climat tropical s'avérèrent idéaux pour la culture du Robusta.
            </BodyText>
            <BodyText>
              C'est le Robusta qui définit aujourd'hui l'identité du café vietnamien. Il représente environ 95 % de la production nationale et 40 % de la production mondiale. Avec une teneur en caféine près du double de celle de l'Arabica (2,2 à 2,7 % contre 1,2 à 1,5 %), il offre un profil gustatif intense, chocolaté, légèrement fumé, avec un corps dense et une faible acidité. Des caractéristiques qui en font la base parfaite des préparations vietnamiennes traditionnelles.
            </BodyText>
          </FadeIn>

          <Divider />

          <FadeIn>
            <h2 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "var(--color-cream)",
              fontWeight: 800,
              marginBottom: "2rem",
              lineHeight: 1.15,
            }}>
              Le café comme art de vivre
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ImagePlaceholder hint="rue de Hanoi ou Saigon avec terrasse de café, ambiance matinale" aspectRatio="16/9" />
          </FadeIn>

          <FadeIn delay={0.15}>
            <BodyText>
              Au Vietnam, le café n'est pas une simple boisson caféinée. C'est un rythme, un rite social, une façon d'habiter le temps. Deux hommes assis sur de petites chaises rouges au bord d'une rue animée, regardant passer la vie devant un phin qui s'égoutte: voilà une scène que l'on retrouve à chaque coin de rue, du nord au sud du pays.
            </BodyText>
            <BodyText>
              La culture du café vietnamien varie selon les régions. Au nord, à Hanoi, on préfère un café noir fort, bu lentement. Au sud, à Hô Chi Minh-Ville, le cà phê sữa đá (café sur glace avec lait concentré) est roi. Au centre, Hué a développé ses propres signatures, dont le fameux café au sel. Ces variations régionales témoignent d'une culture qui évolue tout en restant ancrée dans ses traditions.
            </BodyText>
            <BodyText>
              Les réformes économiques Đổi Mới de 1987 ont profondément transformé l'industrie. Après la guerre, le café est devenu l'un des piliers de la reconstruction économique du pays. Aujourd'hui, une nouvelle génération de torréfacteurs, baristas et producteurs travaille à valoriser les cafés vietnamiens à l'international ; non plus seulement comme matière première brute, mais comme produits d'exception dignes des meilleures tables du monde.
            </BodyText>
          </FadeIn>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — TUTORIEL PHIN
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ padding: isMobile ? "25rem 1.5rem" : "25rem 3rem" }}>
        <Orb top="20%" left="5%" size="45vw" opacity={0.12} />
        <Orb top="70%" left="85%" size="40vw" opacity={0.1} />
        <div className="relative z-10" style={{ maxWidth: "800px", margin: "0 auto" }}>

          <FadeIn>
            <SectionLabel>Tutoriel</SectionLabel>
            <h2 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "var(--color-cream)",
              fontWeight: 800,
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}>
              Comment utiliser un filtre Phin
            </h2>
            <BodyText>
              Le phin est un filtre individuel (souvent métallique) composé de quatre pièces : une chambre, un filtre perforé, un pressoir à gravité et un couvercle. Il produit un café concentré, dense et aromatique, en laissant le temps faire le travail. Comptez 4 à 7 minutes pour une extraction optimale.
            </BodyText>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ImagePlaceholder hint="phin complet avec ses 4 pièces, vue éclatée sur fond sombre" aspectRatio="4/3" />
          </FadeIn>

          {/* Steps */}
          <div style={{ marginTop: "2rem" }}>
            {phinSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{
                  display: "flex",
                  gap: isMobile ? "1rem" : "2rem",
                  marginBottom: "3rem",
                  alignItems: "flex-start",
                }}>
                  {/* Step number */}
                  <div style={{ flexShrink: 0 }}>
                    <span style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: "rgba(194,68,15,0.35)",
                      fontWeight: 800,
                      lineHeight: 1,
                      display: "block",
                    }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  {/* Step content */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                      color: "var(--color-cream)",
                      fontWeight: 800,
                      marginBottom: "0.75rem",
                      lineHeight: 1.2,
                    }}>{step.title}</h3>
                    <BodyText>{step.text}</BodyText>
                    <ImagePlaceholder hint={step.imagehint} aspectRatio="16/9" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — RECETTES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ padding: isMobile ? "15rem 1.5rem" : "15rem 3rem" }}>
        <Orb top="30%" left="80%" size="45vw" opacity={0.12} />
        <div className="relative z-10" style={{ maxWidth: "800px", margin: "0 auto" }}>

          <FadeIn>
            <SectionLabel>Recettes</SectionLabel>
            <h2 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "var(--color-cream)",
              fontWeight: 800,
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}>
              Les classiques vietnamiens
            </h2>
            <BodyText>
              Ces trois recettes partagent une base commune : un café Robusta fort, préparé au phin. C'est la simplicité des ingrédients et la qualité du café qui font toute la différence.
            </BodyText>
          </FadeIn>

          <div style={{ marginTop: "2rem" }}>
            {recipes.map((recipe, i) => (
              <RecipeCard key={i} recipe={recipe} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RÉFÉRENCES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ padding: isMobile ? "3rem 1.5rem 5rem" : "3rem 3rem 8rem" }}>
        <div className="relative z-10" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ width: "48px", height: "1px", background: "rgba(138,43,11,0.4)", marginBottom: "2rem" }} />
            <SectionLabel>Références</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { num: 1, authors: "Vivu Journeys", year: 2026, title: "Vietnamese Coffee: History, Unique Brewing & Regional Favorites", url: "https://vivujourneys.com/destinations/vietnam/vietnamese-coffee-history-unique-brewing-regional-favorites/" },
                { num: 2, authors: "Wikipedia", year: 2026, title: "Vietnamese iced coffee", url: "https://en.wikipedia.org/wiki/Vietnamese_iced_coffee" },
                { num: 3, authors: "Nam Coffee", year: 2022, title: "The History of Vietnamese Coffee", url: "https://www.nam.coffee/blogs/news/the-history-of-vietnamese-coffee" },
                { num: 4, authors: "Heritage Line", year: 2020, title: "The History of Vietnamese Coffee and How to Brew Your Own", url: "https://heritage-line.com/magazine/the-history-of-vietnamese-coffee-and-how-to-brew-your-own/" },
                { num: 5, authors: "National Geographic", year: 2026, title: "How to explore Vietnam's rich coffee culture", url: "https://www.nationalgeographic.com/travel/article/vietnam-coffee-culture" },
                { num: 6, authors: "Vietnam Airlines", title: "Vietnamese Drip Coffee: A Slow-Brewed Cultural Experience", url: "https://www.vietnamairlines.com/us/en/plan-book/travel/travel-guide/vietnamese-drip-coffee" },
                { num: 7, authors: "Tonkin Coffee", year: 2025, title: "Egg coffee Vietnam history: The story behind Cà Phê Trứng", url: "https://tonkin.coffee/egg-coffee-vietnam-history/" },
                { num: 8, authors: "Barista Magazine", year: 2023, title: "An Unfiltered History of Vietnamese Coffee", url: "https://www.baristamagazine.com/an-unfiltered-history-of-vietnamese-coffee/" },
                { num: 9, authors: "A2E Ship", year: 2025, title: "Vietnam Coffee: A Guide to Traditional Phin-Brewed Robusta Coffee", url: "https://a2eship.com/en/vietnam-coffee-a-guide-to-traditional-phin-brewed-robusta-coffee/" },
                { num: 10, authors: "M Hotels & Resorts", title: "Vietnamese Coffee Culture", url: "https://mhotel.vn/vietnamese-coffee-culture/" },
              ].map(ref => (
                <div key={ref.num} style={{ display: "flex", gap: "0.75rem" }}>
                  <span style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "11px",
                    color: "rgba(194,68,15,0.6)",
                    flexShrink: 0,
                    minWidth: "1.5rem",
                  }}>[{ref.num}]</span>
                  <p style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.35)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {ref.authors}{ref.year ? ` (${ref.year})` : ""}. <em style={{ fontStyle: "italic" }}>{ref.title}</em>.{" "}
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{
                      color: "rgba(194,68,15,0.6)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(194,68,15,0.3)",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = "#c2440f"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(194,68,15,0.6)"}
                    >
                      {ref.url}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
