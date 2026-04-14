import { useEffect, useRef } from "react";

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const orbs = [
      {
        xPct: 0.15,
        yPct: 0.2,
        r: 0.45,
        color: "rgba(13, 17, 23, 0.95)",
        speed: 0.0003,
        phase: 0,
      },
      {
        xPct: 0.75,
        yPct: 0.6,
        r: 0.5,
        color: "rgba(80, 40, 140, 0.55)",
        speed: 0.0002,
        phase: Math.PI / 3,
      },
      {
        xPct: 0.5,
        yPct: 0.85,
        r: 0.4,
        color: "rgba(26, 26, 46, 0.85)",
        speed: 0.00025,
        phase: Math.PI * 1.3,
      },
    ];

    const draw = (timestamp: number) => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#0a0d18";
      ctx.fillRect(0, 0, w, h);

      for (const orb of orbs) {
        const drift = Math.sin(timestamp * orb.speed + orb.phase);
        const driftY = Math.cos(timestamp * orb.speed * 0.7 + orb.phase);
        const cx = (orb.xPct + drift * 0.15) * w;
        const cy = (orb.yPct + driftY * 0.12) * h;
        const radius = Math.max(w, h) * orb.r;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: "none" }}
      tabIndex={-1}
    />
  );
}
