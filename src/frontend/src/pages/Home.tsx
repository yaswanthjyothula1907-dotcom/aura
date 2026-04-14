import { CheckoutPreview } from "../components/CheckoutPreview";
import { DynamicIslandNav } from "../components/DynamicIslandNav";
import { HeroSection } from "../components/HeroSection";
import { ProductGrid } from "../components/ProductGrid";

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="border-t border-border/30 px-4 py-8" data-ocid="footer">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl font-bold tracking-widest text-foreground">
          AURA
        </p>
        <p className="text-xs text-muted-foreground text-center">
          © {year}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-foreground transition-smooth"
          >
            caffeine.ai
          </a>
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#footer"
              className="text-xs tracking-widest text-muted-foreground hover:text-foreground uppercase transition-smooth"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <main data-ocid="home.page">
      <DynamicIslandNav />
      <HeroSection />
      <ProductGrid />
      <CheckoutPreview />
      <Footer />
    </main>
  );
}
