'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';
import { useCart } from '@/store/cartStore';
import LoadingPage from '@/components/LoadingPage';
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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
    // Show loading page for initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Fetch featured products
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('/api/products?category=all');
        const data = await response.json();
        setFeaturedProducts((data.products || []).slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    }

    fetchFeaturedProducts();

    return () => clearTimeout(timer);
  }, []);

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

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <Image 
                src="/logo.png" 
                alt="Akshaya Associates Logo" 
                width={120}
                height={120}
                className="h-28 w-auto drop-shadow-lg"
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              AKSHAYA<br />ASSOCIATES
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-medium text-gray-300 max-w-2xl mx-auto">
              Premium Lab Equipment • Chemicals • Glassware • Surgical • Hospital Wares
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-black px-8 py-4 rounded-none font-black text-lg hover:bg-gray-100 transition"
              >
                BROWSE COLLECTION
              </Link>
              <Link
                href="/products?category=lab-equipment"
                className="bg-gray-800 text-white px-8 py-4 rounded-none font-black text-lg hover:bg-gray-900 transition border-2 border-white"
              >
                LAB EQUIPMENT
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-16 tracking-tight">SHOP BY CATEGORY</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="bg-gray-50 border-2 border-gray-200 hover:border-black p-8 text-center group transition-all duration-300"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="text-lg font-black text-gray-900 group-hover:text-black transition uppercase">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">FEATURED PRODUCTS</h2>
            <Link
              href="/products"
              className="text-black hover:text-gray-600 font-black text-lg underline"
            >
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border-2 border-gray-200 hover:border-black transition-all duration-300 overflow-hidden group"
              >
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">PRODUCT IMAGE</span>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-sm tracking-wider text-gray-900 mb-2 line-clamp-2 uppercase">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 text-base mb-4 line-clamp-2 font-medium">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-black">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
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
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-16 text-center tracking-tight">
            WHY CHOOSE US
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-black mb-3 uppercase">AUTHORIZED DISTRIBUTOR</h3>
              <p className="text-gray-600 font-medium">Genuine products from authorized manufacturers</p>
            </div>
            <div className="text-center group">
              <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-black mb-3 uppercase">FAST DELIVERY</h3>
              <p className="text-gray-600 font-medium">Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="text-center group">
              <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-black mb-3 uppercase">BEST PRICES</h3>
              <p className="text-gray-600 font-medium">Best prices in the market with quality assurance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
