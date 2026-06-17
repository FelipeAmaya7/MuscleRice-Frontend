import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { apiLogin, apiRegister } from '../services/authService';

const AUTH_STORAGE_KEY = 'mr-auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password?: string) => Promise<void>;
  register: (userData: Partial<User> & { password?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error leyendo la sesión desde localStorage:', error);
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = user !== null;

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password?: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await apiLogin(email, password);
      setUser(loggedInUser);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al iniciar sesión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await apiRegister(userData);
      setUser(newUser);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al registrarse');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
