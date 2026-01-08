import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest, saveToken, removeToken, getToken } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        try {
          const response = await apiRequest<{
            message: string;
            user: User;
            token: string;
          }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });

          saveToken(response.token);
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.token,
          });
          return true;
        } catch (error: any) {
          console.error('Login error:', error);
          return false;
        }
      },
      signup: async (name: string, email: string, password: string) => {
        try {
          const response = await apiRequest<{
            message: string;
            user: User;
          }>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
          });

          // After signup, automatically login
          const loginResponse = await apiRequest<{
            message: string;
            user: User;
            token: string;
          }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });

          saveToken(loginResponse.token);
          set({
            isAuthenticated: true,
            user: loginResponse.user,
            token: loginResponse.token,
          });
          return true;
        } catch (error: any) {
          console.error('Signup error:', error);
          return false;
        }
      },
      logout: () => {
        removeToken();
        set({ isAuthenticated: false, user: null, token: null });
      },
      checkAuth: async () => {
        const token = getToken();
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null });
          return;
        }

        try {
          const response = await apiRequest<{ user: User }>('/auth/me');
          set({
            isAuthenticated: true,
            user: response.user,
            token,
          });
        } catch (error) {
          removeToken();
          set({ isAuthenticated: false, user: null, token: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
