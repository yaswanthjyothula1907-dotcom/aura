import { ArrowRight, Check } from "lucide-react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface SliderToPayProps {
  onSuccess?: () => void;
  disabled?: boolean;
}

const THUMB_WIDTH = 64;
const TRACK_PADDING = 4;
const SUCCESS_THRESHOLD = 0.8;

export function SliderToPay({ onSuccess, disabled = false }: SliderToPayProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const isDragging = useRef(false);

  const maxX = Math.max(0, trackWidth - THUMB_WIDTH - TRACK_PADDING * 2);
  const x = useMotionValue(0);

  // Track fill progress
  const fillWidth = useTransform(x, [0, maxX], ["0%", "100%"]);
  const thumbTextOpacity = useTransform(x, [0, maxX * 0.3], [1, 0]);
  const arrowScale = useTransform(x, [0, maxX * 0.5], [1, 1.2]);

  // Update track width on resize
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const handleDragEnd = useCallback(() => {
    if (maxX <= 0) return;
    const progress = x.get() / maxX;
    if (progress >= SUCCESS_THRESHOLD) {
      // Snap to end and trigger success
      animate(x, maxX, { duration: 0.2, ease: [0.4, 0, 0.2, 1] });
      setStatus("success");
      onSuccess?.();
      // Reset after 2s
      setTimeout(() => {
        animate(x, 0, { duration: 0.5, ease: [0.4, 0, 0.2, 1] });
        setTimeout(() => setStatus("idle"), 500);
      }, 2000);
    } else {
      // Snap back
      animate(x, 0, { duration: 0.4, ease: [0.4, 0, 0.2, 1] });
    }
  }, [x, maxX, onSuccess]);

  const isSuccess = status === "success";

  return (
    <div
      data-ocid="slider_to_pay.track"
      ref={trackRef}
      className="relative h-16 rounded-full overflow-hidden select-none"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), var(--shadow-glass)",
      }}
    >
      {/* Track fill */}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
        style={{
          width: fillWidth,
          background: isSuccess
            ? "linear-gradient(90deg, oklch(0.65 0.17 145), oklch(0.75 0.18 155))"
            : "linear-gradient(90deg, oklch(0.45 0.14 280 / 0.6), oklch(0.65 0.18 280 / 0.8))",
          transition: "background 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Track label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span
          style={{ opacity: thumbTextOpacity }}
          className="text-sm font-body font-semibold tracking-widest uppercase text-foreground/50"
        >
          {isSuccess ? "" : "Slide to Pay"}
        </motion.span>
        {isSuccess && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-sm font-body font-semibold tracking-widest uppercase"
            style={{ color: "oklch(0.75 0.18 155)" }}
          >
            Payment Confirmed
          </motion.span>
        )}
      </div>

      {/* Draggable thumb */}
      <motion.div
        data-ocid="slider_to_pay.thumb"
        drag={disabled || isSuccess ? false : "x"}
        dragConstraints={{ left: 0, right: maxX }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={handleDragEnd}
        style={{
          x,
          position: "absolute",
          top: TRACK_PADDING,
          left: TRACK_PADDING,
          width: THUMB_WIDTH,
          height: THUMB_WIDTH,
          cursor: disabled || isSuccess ? "default" : "grab",
          touchAction: "none",
          zIndex: 10,
        }}
        whileTap={{ cursor: "grabbing", scale: 0.97 }}
      >
        {/* Thumb pill */}
        <div
          className="w-full h-full rounded-full btn-glossy flex items-center justify-center relative overflow-hidden"
          style={{
            padding: 0,
            background: isSuccess
              ? "linear-gradient(135deg, oklch(0.58 0.16 145), oklch(0.72 0.2 155))"
              : "var(--gradient-primary)",
            boxShadow: isSuccess
              ? "0 0 20px oklch(0.65 0.18 145 / 0.6), inset 0 1px 1px rgba(255,255,255,0.3)"
              : "0 0 20px oklch(0.55 0.16 280 / 0.5), inset 0 1px 1px rgba(255,255,255,0.25)",
            transition:
              "box-shadow 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Inner shine */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, transparent 60%)",
            }}
          />
          <motion.div style={{ scale: arrowScale }}>
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <Check
                  className="w-6 h-6 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </motion.div>
            ) : (
              <ArrowRight
                className="w-6 h-6 text-primary-foreground"
                strokeWidth={2.5}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
