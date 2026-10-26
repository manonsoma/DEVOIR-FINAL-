"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-indigo-600 tracking-tight flex items-center gap-2 hover:opacity-90 transition">
          <span>Soxy</span>
          <span className="text-xl">🧦</span>
        </Link>

        {/* Navigation principale */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-indigo-600 transition">
            Accueil
          </Link>
          <a href="#catalogue" className="hover:text-indigo-600 transition">
            Nos Chaussettes
          </a>
          <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full">
            Nouveautés Chauffantes 🔥
          </span>
        </nav>

        {/* Bouton Panier */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition shadow-xs active:scale-95 cursor-pointer"
          aria-label="Ouvrir le panier"
        >
          <span className="text-lg">🛒</span>
          <span className="text-sm font-semibold text-gray-800">Panier</span>
          {totalItems > 0 && (
            <span className="bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
