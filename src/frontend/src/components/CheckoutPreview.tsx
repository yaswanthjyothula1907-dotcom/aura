import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Shield, ShoppingBag, Truck, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../types/product";
import { MagneticButton } from "./MagneticButton";
import { SliderToPay } from "./SliderToPay";

interface CartItem {
  product: Product;
  qty: number;
}

const INITIAL_CART: CartItem[] = [
  { product: products[3], qty: 1 }, // 'Aeterna' Watch
  { product: products[0], qty: 1 }, // 'Velours Noir' Bag
];

function formatPrice(price: number, currency = "₹") {
  return `${currency}${price.toLocaleString("en-IN")}`;
}

function CartItemRow({
  item,
  onQtyChange,
  onRemove,
  index,
}: {
  item: CartItem;
  onQtyChange: (delta: number) => void;
  onRemove: () => void;
  index: number;
}) {
  return (
    <motion.div
      data-ocid={`checkout.item.${index + 1}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.08,
      }}
      className="flex items-center gap-3"
    >
      {/* Product image */}
      <div
        className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
        }}
      >
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-semibold text-foreground truncate">
          {item.product.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {item.product.category}
        </p>
        <p
          className="text-sm font-semibold mt-1"
          style={{ color: "oklch(0.75 0.18 280)" }}
        >
          {formatPrice(item.product.price * item.qty, item.product.currency)}
        </p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          data-ocid={`checkout.qty_decrease.${index + 1}`}
          onClick={() => onQtyChange(-1)}
          className="w-6 h-6 rounded-full flex items-center justify-center transition-smooth hover:bg-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3 text-muted-foreground" />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-foreground">
          {item.qty}
        </span>
        <button
          type="button"
          data-ocid={`checkout.qty_increase.${index + 1}`}
          onClick={() => onQtyChange(1)}
          className="w-6 h-6 rounded-full flex items-center justify-center transition-smooth hover:bg-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>

      {/* Remove */}
      <button
        type="button"
        data-ocid={`checkout.remove_button.${index + 1}`}
        onClick={onRemove}
        aria-label="Remove item"
        className="w-6 h-6 rounded-full flex items-center justify-center transition-smooth hover:bg-destructive/20"
      >
        <X className="w-3 h-3 text-muted-foreground" />
      </button>
    </motion.div>
  );
}

export function CheckoutPreview() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [paySuccess, setPaySuccess] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleQtyChange = (idx: number, delta: number) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const handleRemove = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePaySuccess = () => {
    setPaySuccess(true);
    setTimeout(() => setPaySuccess(false), 2500);
  };

  return (
    <section
      data-ocid="checkout.section"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.4 0.12 280 / 0.12), transparent)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <span
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4 block"
            style={{ color: "oklch(0.75 0.18 280)" }}
          >
            Secure Checkout
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Complete Your Order
          </h2>
        </motion.div>

        {/* Main layout: order summary + checkout card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Order Summary */}
          <motion.div
            data-ocid="checkout.order_summary.card"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="lg:col-span-3 glass rounded-2xl p-6 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "oklch(0.55 0.16 280 / 0.2)",
                  border: "1px solid oklch(0.55 0.16 280 / 0.3)",
                }}
              >
                <ShoppingBag
                  className="w-4 h-4"
                  style={{ color: "oklch(0.75 0.18 280)" }}
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Your Selection
              </h3>
              <Badge
                variant="secondary"
                className="ml-auto text-xs"
                style={{
                  background: "oklch(0.55 0.16 280 / 0.15)",
                  color: "oklch(0.75 0.18 280)",
                  border: "1px solid oklch(0.55 0.16 280 / 0.25)",
                }}
              >
                {cart.length} items
              </Badge>
            </div>

            <Separator style={{ background: "rgba(255,255,255,0.08)" }} />

            {/* Cart items */}
            <div className="flex flex-col gap-4">
              {cart.length === 0 ? (
                <div
                  data-ocid="checkout.empty_state"
                  className="py-8 text-center text-muted-foreground text-sm"
                >
                  Your selection is empty.
                </div>
              ) : (
                cart.map((item, idx) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    index={idx}
                    onQtyChange={(delta) => handleQtyChange(idx, delta)}
                    onRemove={() => handleRemove(idx)}
                  />
                ))
              )}
            </div>

            <Separator style={{ background: "rgba(255,255,255,0.08)" }} />

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {[
                { icon: Shield, label: "Secure Payment" },
                { icon: Truck, label: "Free Delivery" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Card */}
          <motion.div
            data-ocid="checkout.payment.card"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col gap-5"
          >
            {/* Price breakdown */}
            <h3 className="font-display text-lg font-semibold text-foreground">
              Order Total
            </h3>

            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span
                  style={{ color: "oklch(0.72 0.18 155)" }}
                  className="font-medium"
                >
                  Free
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (20%)</span>
                <span className="text-foreground font-medium">
                  ₹{Math.round(subtotal * 0.2).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Separator style={{ background: "rgba(255,255,255,0.08)" }} />

            <div className="flex justify-between items-baseline">
              <span className="font-display text-base font-semibold text-foreground">
                Total
              </span>
              <span
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(0.82 0.16 280)" }}
              >
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Success state */}
            {paySuccess && (
              <motion.div
                data-ocid="checkout.success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="py-3 px-4 rounded-xl text-center text-sm font-semibold"
                style={{
                  background: "oklch(0.58 0.16 145 / 0.15)",
                  border: "1px solid oklch(0.65 0.18 145 / 0.4)",
                  color: "oklch(0.75 0.18 155)",
                  boxShadow: "0 0 16px oklch(0.58 0.16 145 / 0.2)",
                }}
              >
                ✦ Order placed successfully
              </motion.div>
            )}

            {/* Slide-to-Pay */}
            <div data-ocid="checkout.slider_to_pay">
              <SliderToPay
                onSuccess={handlePaySuccess}
                disabled={cart.length === 0}
              />
            </div>

            {/* Edit bag link */}
            <div className="text-center">
              <MagneticButton
                data-ocid="checkout.edit_bag_button"
                className="text-xs text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-4 bg-transparent border-0"
                strength={0.2}
              >
                Edit bag
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
