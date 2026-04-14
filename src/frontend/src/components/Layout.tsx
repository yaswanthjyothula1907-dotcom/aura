import { MeshBackground } from "./MeshBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="relative min-h-screen text-foreground"
      style={{ colorScheme: "dark" }}
    >
      {/* Fixed animated mesh gradient layer */}
      <MeshBackground />

      {/* Content layer above mesh */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
