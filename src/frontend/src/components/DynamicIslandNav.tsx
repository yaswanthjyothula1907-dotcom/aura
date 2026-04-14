import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

const NAV_LINKS = ["Collection", "Lookbook", "About", "Contact"] as const;

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function DynamicIslandNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      {/* Main pill nav */}
      <div
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        data-ocid="navbar"
      >
        <motion.nav
          layout
          animate={{
            width: scrolled ? "min(720px, calc(100% - 2rem))" : "200px",
            paddingLeft: scrolled ? "1.5rem" : "1.25rem",
            paddingRight: scrolled ? "1.5rem" : "1.25rem",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
          }}
          transition={springTransition}
          className="relative backdrop-blur-lg rounded-full border border-white/10 overflow-hidden pointer-events-auto"
          style={{
            background: scrolled
              ? "rgba(15, 10, 30, 0.7)"
              : "rgba(15, 10, 30, 0.5)",
            boxShadow: "var(--shadow-glass)",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <a
              href="/"
              data-ocid="navbar.brand_link"
              className="shrink-0 font-display font-bold tracking-[0.25em] text-foreground whitespace-nowrap"
              style={{ fontSize: scrolled ? "1rem" : "0.9rem" }}
            >
              AURA
            </a>

            {/* Desktop links — only visible when expanded */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  key="nav-links"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="hidden md:flex items-center gap-7"
                >
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      data-ocid={`navbar.${link.toLowerCase()}_link`}
                      className="text-[11px] tracking-widest uppercase font-body font-medium text-muted-foreground hover:text-primary whitespace-nowrap transition-smooth"
                    >
                      {link}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA + mobile hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <AnimatePresence>
                {scrolled && (
                  <motion.a
                    key="shop-now"
                    href="#collection"
                    data-ocid="navbar.shop_now_button"
                    initial={{ opacity: 0, scale: 0.85, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: "auto" }}
                    exit={{ opacity: 0, scale: 0.85, width: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="hidden md:block btn-glossy text-primary-foreground text-[11px] tracking-[0.18em] uppercase overflow-hidden whitespace-nowrap"
                    style={{ padding: "0.4rem 1.1rem" }}
                  >
                    Shop Now
                  </motion.a>
                )}
              </AnimatePresence>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                data-ocid="navbar.mobile_menu_toggle"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden text-foreground p-1 rounded-full hover:bg-white/10 transition-smooth"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed top-[4.5rem] left-4 right-4 z-40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col gap-4"
            style={{
              background: "rgba(12, 8, 28, 0.85)",
              boxShadow: "var(--shadow-glass)",
            }}
            data-ocid="navbar.mobile_menu"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-ocid={`navbar.mobile.${link.toLowerCase()}_link`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-widest uppercase font-body font-semibold text-muted-foreground hover:text-primary transition-smooth py-1 border-b border-white/5 last:border-0"
              >
                {link}
              </motion.a>
            ))}
            <button
              type="button"
              data-ocid="navbar.mobile.shop_now_button"
              onClick={() => {
                setMobileOpen(false);
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-glossy text-primary-foreground text-[11px] tracking-[0.18em] uppercase text-center mt-2 w-full"
            >
              Shop Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
