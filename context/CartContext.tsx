"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image_url?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: { id: string | number; title?: string; name?: string; price?: number; image_url?: string }) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger le panier depuis le LocalStorage au démarrage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("soxy_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erreur de lecture du panier :", e);
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder dans le LocalStorage à chaque modification
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("soxy_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: { id: string | number; title?: string; name?: string; price?: number; image_url?: string }) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title || product.name || "Chaussette Soxy",
          price: product.price ?? 0,
          image_url: product.image_url,
          quantity: 1,
        },
      ];
    });
    setIsOpen(true); // Ouvre automatiquement le tiroir quand on ajoute un produit
  };

  const removeFromCart = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé au sein d'un CartProvider");
  }
  return context;
}
