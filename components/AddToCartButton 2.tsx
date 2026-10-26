"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string | number;
    title?: string;
    name?: string;
    price?: number;
    image_url?: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`mt-4 w-full py-2.5 px-4 rounded-md font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
        added
          ? "bg-emerald-600 text-white shadow-emerald-200"
          : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200"
      }`}
    >
      {added ? (
        <>
          <span className="text-base font-bold">✓</span>
          <span>Ajouté au panier !</span>
        </>
      ) : (
        <>
          <span>🛒</span>
          <span>Ajouter au panier</span>
        </>
      )}
    </button>
  );
}
