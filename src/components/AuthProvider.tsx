'use client';

import { useEffect } from 'react';
import { useAuth } from '@/store/authStore';
import { getToken } from '@/lib/api';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuth((state) => state.checkAuth);
  const token = useAuth((state) => state.token);

  useEffect(() => {
    // Check auth on mount and if token exists
    const storedToken = getToken();
    if (storedToken) {
      checkAuth();
    }
  }, []);

  return <>{children}</>;
}
