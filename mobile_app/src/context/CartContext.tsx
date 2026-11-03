import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "../data/catalog";

export type CartLine = {
  product: Product;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  toast: string | null;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);

    return {
      lines,
      count,
      subtotal,
      toast,
      add: (product, qty = 1) => {
        setLines((current) => {
          const existing = current.find((line) => line.product.id === product.id);
          if (existing) {
            return current.map((line) =>
              line.product.id === product.id ? { ...line, qty: line.qty + qty } : line
            );
          }
          return [...current, { product, qty }];
        });
        setToast(`${product.name} added to bag`);
        setTimeout(() => setToast(null), 1800);
      },
      setQty: (id, qty) => {
        setLines((current) =>
          qty <= 0
            ? current.filter((line) => line.product.id !== id)
            : current.map((line) => (line.product.id === id ? { ...line, qty } : line))
        );
      },
      remove: (id) => setLines((current) => current.filter((line) => line.product.id !== id)),
      clear: () => setLines([]),
      dismissToast: () => setToast(null),
    };
  }, [lines, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
