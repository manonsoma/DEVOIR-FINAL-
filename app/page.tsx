import { supabase } from '@/lib/supabase';

export default async function HomePage() {
  const { data: products } = await supabase.from('products').select('*');

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nos Chaussettes Rigolotes & Chauffantes 🧦</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600 text-sm my-2">{product.description}</p>
            <p className="text-lg font-bold text-indigo-600">{product.price} €</p>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
