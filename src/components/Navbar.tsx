'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/store/cartStore';
import { useAuth } from '@/store/authStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCart((state) => state.items);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">Akshaya Associates</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/products?category=lab-equipment" className="text-gray-700 hover:text-blue-600 transition">
              Lab Equipment
            </Link>
            <Link href="/products?category=chemicals" className="text-gray-700 hover:text-blue-600 transition">
              Chemicals
            </Link>
            <Link href="/products?category=glassware" className="text-gray-700 hover:text-blue-600 transition">
              Glassware
            </Link>
            <Link href="/products?category=surgicals" className="text-gray-700 hover:text-blue-600 transition">
              Surgicals
            </Link>
            <Link href="/products?category=hospital-wares" className="text-gray-700 hover:text-blue-600 transition">
              Hospital Wares
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 hidden sm:block">Welcome, {user?.name || user?.email}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-blue-600 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/products" className="block py-2 text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link href="/products?category=lab-equipment" className="block py-2 text-gray-700 hover:text-blue-600">
              Lab Equipment
            </Link>
            <Link href="/products?category=chemicals" className="block py-2 text-gray-700 hover:text-blue-600">
              Chemicals
            </Link>
            <Link href="/products?category=glassware" className="block py-2 text-gray-700 hover:text-blue-600">
              Glassware
            </Link>
            <Link href="/products?category=surgicals" className="block py-2 text-gray-700 hover:text-blue-600">
              Surgicals
            </Link>
            <Link href="/products?category=hospital-wares" className="block py-2 text-gray-700 hover:text-blue-600">
              Hospital Wares
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
