import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

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
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nos Chaussettes Rigolotes & Chauffantes 🧦</h1>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title || product.name || 'Produit'}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{product.title || product.name}</h2>
              {product.description && <p className="text-gray-600 text-sm my-2">{product.description}</p>}
              {product.price !== undefined && (
                <p className="text-lg font-bold text-indigo-600">{product.price} €</p>
              )}
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 border rounded-lg bg-gray-50 text-center">
          <p className="text-gray-600">Aucun produit dans la base pour le moment.</p>
        </div>
      )}
    </main>
  );
}
