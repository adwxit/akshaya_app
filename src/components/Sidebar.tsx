'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'lab-equipment', name: 'Lab Equipment', icon: '🔬' },
  { id: 'chemicals', name: 'Chemicals', icon: '🧪' },
  { id: 'glassware', name: 'Glassware', icon: '⚗️' },
  { id: 'surgical', name: 'Surgical', icon: '🔪' },
  { id: 'hospital-wares', name: 'Hospital Wares', icon: '🏥' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const activeCategory = searchParams.get('category') || 'all';

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg z-40"
      >
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-30 overflow-y-auto ${
          isOpen ? 'w-64' : '-translate-x-full md:translate-x-0 md:w-64'
        } md:translate-x-0`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>

          <nav className="space-y-2">
            {categories.map((category) => {
              const href =
                category.id === 'all' ? '/products' : `/products?category=${category.id}`;
              const isActive =
                category.id === 'all'
                  ? pathname === '/products' && !activeCategory
                  : activeCategory === category.id;

              return (
                <Link
                  key={category.id}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
