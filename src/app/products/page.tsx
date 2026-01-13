'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/data/products';
import { useCart } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'all';
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (categoryFilter !== 'all') {
          params.append('category', categoryFilter);
        }
        if (searchTerm) {
          params.append('search', searchTerm);
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryFilter, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight">
            SHOP PRODUCTS
          </h1>
          <p className="text-lg text-gray-600 font-medium">Discover our premium collection</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/products?category=all"
            className={`px-6 py-2 font-bold text-sm tracking-wide transition-all ${
              categoryFilter === 'all'
                ? 'bg-black text-white'
                : 'bg-white border-2 border-gray-300 text-gray-900 hover:border-black'
            }`}
          >
            ALL PRODUCTS
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className={`px-6 py-2 font-bold text-sm tracking-wide transition-all ${
                categoryFilter === category.id
                  ? 'bg-black text-white'
                  : 'bg-white border-2 border-gray-300 text-gray-900 hover:border-black'
              }`}
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">LOADING PRODUCTS...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">NO PRODUCTS FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white border-2 border-gray-100 hover:border-black transition-all duration-300 overflow-hidden"
              >
                <div className="h-56 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <span className="text-gray-400 text-sm">PRODUCT IMAGE</span>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">OUT OF STOCK</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-black text-sm tracking-wider text-gray-900 mb-2 line-clamp-2 uppercase">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-4 line-clamp-2 font-medium">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-black">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 ${
                      product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'IN STOCK' : 'SOLD OUT'}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-3 font-black text-sm tracking-wide transition-all duration-300 ${
                      product.inStock
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
