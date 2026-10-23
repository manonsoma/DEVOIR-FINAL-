import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import AddToCartButton from '@/components/AddToCartButton';

interface Product {
  id: string | number;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  image_url?: string;
}

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: products } = await supabase.from('products').select('*');

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto" id="catalogue">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Nos Chaussettes Rigolotes & Chauffantes 🧦
        </h1>
        <p className="text-gray-600 mt-2">
          Découvrez notre collection unique pour garder vos pieds bien au chaud et avec le sourire.
        </p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title || product.name || 'Chaussette'}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-4xl">
                    🧦
                  </div>
                )}
                <h2 className="text-lg font-bold text-gray-900">{product.title || product.name}</h2>
                {product.description && (
                  <p className="text-gray-600 text-sm my-2 line-clamp-2">{product.description}</p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Prix TTC</span>
                  {product.price !== undefined && (
                    <span className="text-xl font-black text-indigo-600">{product.price} €</span>
                  )}
                </div>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white text-center">
          <span className="text-4xl block mb-2">🧦</span>
          <p className="text-gray-700 font-semibold text-lg">Aucun produit dans la base pour le moment.</p>
          <p className="text-gray-500 text-sm mt-1">Ajoutez des produits dans votre table Supabase "products".</p>
        </div>
      )}
    </main>
  );
}
