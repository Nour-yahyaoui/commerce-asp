// app/collections/[id]/page.tsx
import { sql } from '../../lib/db';
import { getProductPriceInfo } from '../../lib/pricing';
import ProductCard from '../../components/productCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Collection, Product } from '../../types';

interface CollectionPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  // Handle both resolved and unresolved params
  const resolvedParams = await params;
  
  // Validate that id exists
  if (!resolvedParams?.id) {
    console.error('Collection ID is missing');
    notFound();
  }

  const collectionId = parseInt(resolvedParams.id);
  
  // Check if parsing resulted in a valid number
  if (isNaN(collectionId) || collectionId <= 0) {
    console.error('Invalid collection ID:', resolvedParams.id);
    notFound();
  }
  
  try {
    // Fetch collection
    const collectionResult = await sql`
      SELECT * FROM collections WHERE id = ${collectionId}
    `;
    
    if (!collectionResult || !collectionResult.length) {
      console.error('Collection not found for ID:', collectionId);
      notFound();
    }
    
    const collection = collectionResult[0] as Collection;
    
    // Fetch products in collection
    const products = await sql`
      SELECT p.* FROM products p
      JOIN collection_products cp ON p.id = cp.product_id
      WHERE cp.collection_id = ${collectionId}
    `;

    // Get price info for each product
    const productsWithPrices = await Promise.all(
      (products as Product[]).map(async (product: Product) => {
        const priceInfo = await getProductPriceInfo(product.id);
        return { ...product, priceInfo };
      })
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <nav className="flex gap-4 mb-8 border-b pb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/collections" className="font-semibold text-blue-600">Collections</Link>
          <Link href="/soldes" className="hover:text-blue-600">Sales</Link>
          <Link href="/offers" className="hover:text-blue-600">Weekly Offers</Link>
          <Link href="/liked" className="hover:text-blue-600">❤️ Liked</Link>
        </nav>

        {/* Collection Header */}
        <div className="mb-8">
          <img 
            src={collection.image_url || 'https://via.placeholder.com/1200x300'} 
            alt={collection.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
          <p className="text-gray-600 mb-4">{collection.description}</p>
          <p className="text-sm text-gray-500">{products.length} products in this collection</p>
        </div>

        {/* Products Grid */}
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        {productsWithPrices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsWithPrices.map((product: any) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                priceInfo={product.priceInfo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products in this collection yet.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching collection:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading collection</p>
          <p className="text-sm mt-2">{(error as Error)?.message || 'Please try again later.'}</p>
        </div>
        <Link href="/collections" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to Collections
        </Link>
      </div>
    );
  }
}