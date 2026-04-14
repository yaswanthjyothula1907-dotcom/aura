import { ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  index: number;
}

const badgeColors: Record<string, string> = {
  NEW: "from-emerald-400/80 to-teal-500/80",
  SALE: "from-rose-400/80 to-pink-500/80",
  EXCLUSIVE: "from-violet-400/80 to-purple-600/80",
  BESTSELLER: "from-amber-400/80 to-orange-500/80",
};

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const currency = product.currency ?? "₹";
  const badgeClass = product.badge
    ? (badgeColors[product.badge] ?? "from-primary/80 to-ring/80")
    : "";

  function handleAddToCart() {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <motion.article
      data-ocid={`product.item.${index + 1}`}
      className="group relative flex flex-col rounded-xl overflow-hidden glass glass-hover cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ willChange: "transform" }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      {/* Image container with emboss + shine effect */}
      <div className="relative overflow-hidden aspect-[4/3] bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
          loading="lazy"
        />

        {/* Embossed inner shadow overlay — makes the image look inset */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 2px 12px 0 rgba(0,0,0,0.45), inset 0 -2px 12px 0 rgba(0,0,0,0.3)",
            borderRadius: "inherit",
          }}
        />

        {/* Liquid shine sweep on hover */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            className="absolute top-0 h-full w-1/2"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
              skewX: -15,
            }}
            initial={{ left: "-60%" }}
            animate={isHovered ? { left: "130%" } : { left: "-60%" }}
            transition={
              isHovered
                ? { duration: 0.65, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0 }
            }
          />
        </div>

        {/* Badge */}
        {product.badge && (
          <div
            data-ocid={`product.badge.${index + 1}`}
            className={`absolute top-3 left-3 bg-gradient-to-r ${badgeClass} backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-body font-bold tracking-[0.15em] text-white/95 shadow-glass`}
          >
            {product.badge}
          </div>
        )}

        {/* Quick-action overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="text-[10px] font-body tracking-[0.2em] uppercase text-white/60">
            Quick View
          </span>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 gap-2 p-4">
        {/* Category + rating row */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-primary/80"
            data-ocid={`product.category.${index + 1}`}
          >
            {product.category}
          </span>
          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <Star className="w-2.5 h-2.5 fill-current text-amber-400" />
            5.0
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-base font-semibold text-card-foreground leading-snug tracking-tight line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[11px] font-body text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display text-lg font-bold text-foreground">
            {currency}
            {product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-muted-foreground line-through">
              {currency}
              {product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          type="button"
          data-ocid={`product.add_button.${index + 1}`}
          onClick={handleAddToCart}
          className="btn-glossy w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase text-primary-foreground mt-1"
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {isAdded ? "Added ✓" : "Add to Bag"}
        </motion.button>
      </div>
    </motion.article>
  );
}
