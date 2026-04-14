import { Badge } from "@/components/ui/badge";
import { ArrowRight, Gem, Star } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { featuredProduct } from "../data/products";

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────────
function TiltCard({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 25,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width - 0.5);
      mouseY.set((e.clientY - top) / height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(139,107,184,0.35) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── Floating CTA Box ──────────────────────────────────────────────────────────
const FloatingCTA = motion.div;

// ─── Container animation variants ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export function HeroSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      data-ocid="hero.section"
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-20 py-24 overflow-hidden"
    >
      {/* Ambient light blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25"
        style={{ background: "oklch(0.55 0.16 280)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-20"
        style={{ background: "oklch(0.62 0.15 310)" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto] gap-4"
      >
        {/* ── CELL 1: Hero Headline (top-left) ── */}
        <motion.div
          variants={fadeInLeft}
          data-ocid="hero.headline_card"
          className="md:col-span-5 md:row-span-1 glass rounded-2xl p-7 flex flex-col justify-between min-h-[160px]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Gem className="w-4 h-4 text-primary opacity-80" />
            <span className="text-xs font-body tracking-[0.25em] uppercase text-muted-foreground">
              Aura — SS 2025
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-foreground">
            The Art
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.18 280), oklch(0.88 0.1 310))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              of Luxury
            </span>
          </h1>
        </motion.div>

        {/* ── CELL 2: Stat Badge (top-middle) ── */}
        <motion.div
          variants={cellVariants}
          data-ocid="hero.stat_card"
          className="md:col-span-3 md:row-span-1 glass rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.55 0.16 280 / 0.25)",
              border: "1px solid oklch(0.75 0.18 280 / 0.3)",
            }}
          >
            <Star
              className="w-5 h-5"
              style={{ color: "oklch(0.85 0.15 75)" }}
              fill="currentColor"
            />
          </div>
          <p className="font-display text-4xl font-bold text-foreground leading-none">
            500+
          </p>
          <p className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground">
            Curated Pieces
          </p>
          <Badge
            variant="secondary"
            className="text-[10px] tracking-widest uppercase border-primary/30"
          >
            Est. 1998
          </Badge>
        </motion.div>

        {/* ── CELL 3: Testimonial (top-right) ── */}
        <motion.div
          variants={fadeInRight}
          data-ocid="hero.testimonial_card"
          className="md:col-span-4 md:row-span-1 glass rounded-2xl p-6 flex flex-col justify-between"
        >
          <p className="font-display text-sm italic leading-relaxed text-foreground/80">
            "Every piece tells a story of timeless craftsmanship — worn by those
            who understand that true luxury is never rushed."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&q=80"
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-body font-semibold tracking-wide text-foreground/90">
                Isabelle Moreau
              </p>
              <p className="text-[11px] text-muted-foreground">Paris, France</p>
            </div>
            <div className="ml-auto flex gap-0.5">
              {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
                <Star
                  key={k}
                  className="w-3 h-3"
                  style={{ color: "oklch(0.85 0.15 75)" }}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CELL 4: Primary Masterpiece Product Card ── */}
        <motion.div
          variants={cellVariants}
          data-ocid="hero.featured_card"
          className="md:col-span-7 md:row-span-1 group relative"
        >
          <TiltCard className="relative w-full h-full min-h-[440px] rounded-2xl overflow-hidden cursor-pointer">
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={
                  imgError
                    ? "/assets/images/placeholder.svg"
                    : featuredProduct.image
                }
                alt={featuredProduct.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              />
              {/* Image vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                }}
              />
            </div>

            {/* Exclusive badge */}
            {featuredProduct.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="glass text-[10px] font-body font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full text-foreground/90">
                  {featuredProduct.badge}
                </span>
              </div>
            )}

            {/* Product info overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 p-6"
              style={{ transform: "translateZ(30px)" }}
            >
              <p className="text-xs font-body tracking-[0.3em] uppercase text-foreground/60 mb-1">
                {featuredProduct.category}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-1">
                {featuredProduct.name}
              </h2>
              <p className="text-sm text-foreground/70 font-body">
                {featuredProduct.description}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">
                {featuredProduct.currency}
                {featuredProduct.price.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Liquid shine on hover */}
            <div className="shine-overlay rounded-2xl" />
          </TiltCard>
        </motion.div>

        {/* ── CELL 5: Floating CTA Box (spans beside or over product) ── */}
        <motion.div
          variants={fadeInRight}
          data-ocid="hero.cta_card"
          className="md:col-span-5 md:row-span-1 relative"
        >
          <FloatingCTA
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="glass rounded-2xl p-7 h-full flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <p className="text-xs font-body tracking-[0.3em] uppercase text-muted-foreground mb-2">
                New Collection
              </p>
              <h3 className="font-display text-2xl font-bold text-foreground leading-snug mb-1">
                Maison Aura
                <br />
                <span style={{ color: "oklch(0.75 0.18 280)" }}>
                  Spring–Summer '25
                </span>
              </h3>
              <p className="text-sm text-foreground/60 font-body mt-2 leading-relaxed">
                Immerse yourself in the new season — where couture meets
                conscience, and elegance finds its edge.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
              <button
                type="button"
                data-ocid="hero.shop_cta_button"
                onClick={() =>
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-glossy flex items-center gap-2 text-foreground text-sm"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="glass rounded-xl px-4 py-2 flex items-baseline gap-1">
                <span className="text-xs font-body text-muted-foreground">
                  From
                </span>
                <span className="font-display text-lg font-bold text-foreground">
                  ₹580
                </span>
              </div>
            </div>
          </FloatingCTA>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="w-px h-8 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.75 0.18 280 / 0.8), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
