# Design Brief: Ultra-Glossy Luxury Showcase

## Visual Direction
Premium digital luxury, editorial elegance, glassmorphism-first aesthetic. High-fashion e-commerce interface with immersive depth and wet, polished surfaces. Dark mode exclusively with violet accents as premium call-outs.

## Tone
Refined maximalism — luxurious without excess. Every surface deliberate. Confidence over playfulness. Sophisticated interactivity.

## Color Palette (OKLCH)

| Role | Value | Usage |
|------|-------|-------|
| Background | 0.1 0 0 (Deep Slate) | Page base, immersive dark foundation |
| Card/Glass | 0.16 0 0 (Charcoal) | Elevated surfaces, frosted glass containers |
| Foreground | 0.95 0 0 (Off-White) | Primary text, high contrast |
| Primary | 0.55 0.16 280 (Royal Violet) | CTAs, hero accents, premium interactive |
| Accent | 0.75 0.18 280 (Violet Shimmer) | Rare highlights, luxury details |
| Border | 0.28 0.02 0 (Subtle Gray) | Glass edges, 1px semi-transparent |
| Muted | 0.25 0 0 (Dark Gray) | Secondary UI, inactive states |

## Typography

| Layer | Font | Usage |
|-------|------|-------|
| Display | Lora (Serif) | Headers, product names, editorial hierarchy |
| Body | Plus Jakarta Sans (Sans) | Navigation, buttons, UI labels, wide-tracked |
| Mono | JetBrains Mono | Code, technical details |

## Elevation & Depth
- **Glass Shadow**: `0 8px 32px 0 rgba(139, 107, 184, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)` — frosted glass with inner luminosity
- **Premium Shadow**: `0 20px 60px -10px rgba(0, 0, 0, 0.4)` — deep depth for floating elements
- **Backdrop Blur**: `backdrop-blur-lg` standard on glass surfaces
- **Border**: 1px semi-transparent white/10 on glass cards for definition

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Hero | Glass card, mesh gradient background, shadow-premium | Immersive introduction, frosted CTA box |
| Product Grid | Glass cards with shine overlay, shadow-glass on hover | Embossed feel, liquid interaction |
| Sticky Nav | Floating glass effect, transparent, spring transitions | Premium navigation, Dynamic Island style |
| Footer | Glass border-top, muted background | Intentional closure, same grammar as header |

## Spacing & Rhythm
- Base unit: 4px (Tailwind default)
- Content padding: 2rem (32px) on lg, 1.5rem on md, 1rem on sm
- Card border-radius: 0.75rem (12px) for premium proportion
- Gaps: 1.5rem between sections, 1rem between cards

## Component Patterns
- **Button**: `.btn-glossy` — gradient primary background, glass shadow, elevates on hover, cubic-bezier easing
- **Card**: `.glass` — backdrop-blur, semi-transparent bg-card/40, white/10 border, glass shadow
- **Interactive**: All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` for professional smoothness
- **Hover States**: Slight elevation (translateY -2px), increased blur, shadow elevation

## Motion
- **Mesh Gradient**: 15s loop, slow organic drift through slate → violet → charcoal
- **Liquid Shine**: 3s sweep across product images, white gradient overlay
- **Float Animation**: Subtle 3s up/down float for CTA boxes
- **Glass Expand**: Spring transition on navbar scroll reveal
- **All Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for high-end feel

## Signature Detail
**Animated Mesh Gradient + Glassmorphism Choreography**: Background pulses with slow mesh animation while glass surfaces layer depth through dual shadows (outer glow + inner luminosity) and subtle transparency shifts on interaction. This creates a "wet glass on moving silk" metaphor — immersive, alive, premium.

## Constraints
- Mobile-first responsive design (sm: 640px, md: 768px, lg: 1024px)
- WCAG AA contrast on all text (foreground 0.95 on background 0.1 = 0.85 L delta)
- No generic shadows — only `glass` or `premium` defined
- No arbitrary colors — OKLCH tokens only
- Fonts: Lora (display), Plus Jakarta Sans (body), JetBrains Mono (mono) — bundled only

## Anti-Patterns Avoided
- No full-page gradients (mesh gradient is subtle background, not dominant)
- No rainbow color spreads (violet + slate + charcoal only)
- No uniform rounded corners (intentional 0, 4px, 12px, 24px variation)
- No glossy without purpose (glass used only on elevated, interactive surfaces)
- No animation without choreography (mesh + shine + float orchestrated together)
