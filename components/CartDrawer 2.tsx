"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  if (!isOpen) return null;

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Arrière-plan semi-transparent */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Tiroir coulissant */}
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col z-10 p-6 overflow-hidden animate-slideLeft">
        {/* En-tête */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🛒 Mon Panier{" "}
            <span className="text-sm font-normal text-gray-500">
              ({totalItems} article{totalItems > 1 ? "s" : ""})
            </span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold p-1 leading-none rounded-md hover:bg-gray-100 transition"
            aria-label="Fermer le panier"
          >
            ✕
          </button>
        </div>

        {/* Barre de réassurance livraison offerte */}
        <div className="py-3 px-4 my-3 bg-amber-50 rounded-lg text-xs text-amber-900 border border-amber-200">
          {remainingForFreeShipping === 0 ? (
            <p className="font-semibold text-emerald-700 flex items-center gap-1.5">
              <span>🎉</span> Félicitations ! La livraison standard est offerte !
            </p>
          ) : (
            <div>
              <p>
                Plus que <strong className="font-bold text-amber-950">{remainingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte !
              </p>
              <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Liste des articles */}
        <div className="flex-1 overflow-y-auto divide-y pr-1">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 py-12">
              <span className="text-5xl">🧦</span>
              <p className="text-base font-medium text-gray-600">Votre panier est vide</p>
              <p className="text-xs text-gray-400 text-center max-w-xs">
                Découvrez nos chaussettes chauffantes et rigolotes pour remplir votre panier !
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-md hover:bg-indigo-700 transition"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-center">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md border shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-xl shrink-0">
                    🧦
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate text-gray-800">{item.title}</h3>
                  <p className="text-sm text-indigo-600 font-bold mt-0.5">{item.price} €</p>

                  {/* Contrôles de quantité */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-sm font-semibold hover:bg-gray-100 transition active:scale-95"
                      aria-label="Diminuer la quantité"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1 min-w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-sm font-semibold hover:bg-gray-100 transition active:scale-95"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bouton supprimer */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-600 p-2 text-base transition rounded-md hover:bg-red-50"
                  title="Supprimer du panier"
                  aria-label="Supprimer du panier"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pied du tiroir */}
        {items.length > 0 && (
          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600 text-sm">Sous-total :</span>
              <span className="text-2xl font-black text-gray-900">{subtotal.toFixed(2)} €</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">Taxes incluses et frais de port calculés à l'étape suivante.</p>
            <button
              onClick={() => alert("Simulation : Redirection vers le paiement sécurisé...")}
              className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>🔒</span> Passer la commande
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
