import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Akshaya Associates</h3>
            <p className="text-sm">
              Authorized distributor of Lab Equipment, Chemicals, Glassware, Surgicals, and Hospital Wares.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=lab-equipment" className="hover:text-white transition">
                  Lab Equipment
                </Link>
              </li>
              <li>
                <Link href="/products?category=chemicals" className="hover:text-white transition">
                  Chemicals
                </Link>
              </li>
              <li>
                <Link href="/products?category=glassware" className="hover:text-white transition">
                  Glassware
                </Link>
              </li>
              <li>
                <Link href="/products?category=surgicals" className="hover:text-white transition">
                  Surgicals
                </Link>
              </li>
              <li>
                <Link href="/products?category=hospital-wares" className="hover:text-white transition">
                  Hospital Wares
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@akshayaassociates.com</li>
              <li>Phone: +91 XXXXX XXXXX</li>
              <li>Address: Your Business Address</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Akshaya Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
