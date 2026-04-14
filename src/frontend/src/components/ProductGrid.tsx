import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

const CATEGORIES = [
  "All",
  "Bags",
  "Watches",
  "Jewellery",
  "Shoes",
  "Accessories",
  "Scarves",
] as const;
type FilterCategory = (typeof CATEGORIES)[number];

export function ProductGrid() {
  const [active, setActive] = useState<FilterCategory>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? products
        : products.filter((p) => p.category === active),
    [active],
  );

  return (
    <section
      id="collection"
      data-ocid="collection.section"
      className="relative py-24 px-4 md:px-8 lg:px-12"
    >
      {/* Subtle radial glow behind section */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 20%, oklch(0.55 0.16 280 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Section headline */}
      <div className="text-center mb-14">
        <motion.p
          className="font-body text-xs tracking-[0.3em] uppercase text-primary/70 mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Curated for you
        </motion.p>
        <motion.h2
          className="font-display text-5xl md:text-6xl font-bold text-foreground tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          The Collection
        </motion.h2>
        <motion.div
          className="mt-4 mx-auto h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.55 0.16 280 / 0.6), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Category filter tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-2.5 mb-12"
        data-ocid="collection.filter.tab"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        role="tablist"
        aria-label="Filter by category"
      >
        {CATEGORIES.map((cat) => (
          <FilterTab
            key={cat}
            label={cat}
            isActive={active === cat}
            onClick={() => setActive(cat)}
          />
        ))}
      </motion.div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-screen-2xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            data-ocid="collection.empty_state"
            className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl">✦</span>
            <p className="font-body text-sm tracking-wide">
              No items in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── Filter Tab ───────────────────────────────────────────────── */

interface FilterTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterTab({ label, isActive, onClick }: FilterTabProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      data-ocid={`collection.filter.${label.toLowerCase()}`}
      type="button"
      className={[
        "relative px-5 py-2 rounded-full text-[11px] font-body font-semibold tracking-[0.18em] uppercase",
        "backdrop-blur-md border transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        "cursor-pointer select-none",
        isActive
          ? "border-primary/60 text-primary"
          : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground",
      ].join(" ")}
      style={
        isActive
          ? {
              background:
                "linear-gradient(135deg, oklch(0.55 0.16 280 / 0.18) 0%, oklch(0.75 0.18 280 / 0.10) 100%)",
              boxShadow:
                "0 0 18px 0 oklch(0.55 0.16 280 / 0.25), inset 0 1px 1px rgba(255,255,255,0.12)",
            }
          : {
              background: "oklch(0.16 0 0 / 0.5)",
            }
      }
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="filter-indicator"
          className="absolute inset-0 rounded-full border border-primary/40 pointer-events-none"
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden
        />
      )}
    </button>
  );
}
