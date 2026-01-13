'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/authStore';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  totalAmount: number;
  shippingAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, router]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else if (response.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link href="/products" className="text-blue-600 hover:underline">
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b">
                <p className="mb-2">
                  <span className="font-semibold">Status: </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Payment: </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Items ({order.items.length})</p>
                <p className="text-sm text-gray-600">
                  Shipping: ₹{order.shippingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
