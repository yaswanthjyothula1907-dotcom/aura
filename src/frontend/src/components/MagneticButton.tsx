import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMagneticEffect } from "../hooks/useMagneticEffect";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
  "data-ocid"?: string;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  onClick,
  disabled = false,
  "data-ocid": dataOcid,
  type = "button",
}: MagneticButtonProps) {
  const { onMouseMove, onMouseLeave, x, y } = useMagneticEffect(
    disabled ? 0 : strength,
  );

  return (
    <motion.button
      type={type}
      data-ocid={dataOcid}
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", damping: 15, stiffness: 200, mass: 0.5 }}
    >
      {children}
    </motion.button>
  );
}
