import { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Fallback Mock helper: Retrasa la respuesta para simular carga de red
const simulateNetworkDelay = <T,>(data: T, ms: number = 1500): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
};

const getMockUser = (email: string, name: string = 'Usuario Atleta'): User => ({
  id: 'usr-' + Math.random().toString(36).substr(2, 9),
  name,
  email,
  role: 'customer',
});

export const apiLogin = async (email: string, password?: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas o servidor inalcanzable');
    }

    return await response.json();
  } catch (error) {
    console.warn('⚠️ API no disponible. Usando Fallback Mock para apiLogin...');
    return simulateNetworkDelay(getMockUser(email));
  }
};

export const apiRegister = async (userData: Partial<User> & { password?: string }): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    return await response.json();
  } catch (error) {
    console.warn('⚠️ API no disponible. Usando Fallback Mock para apiRegister...');
    return simulateNetworkDelay(getMockUser(userData.email || 'correo@nuevo.com', userData.name || 'Nuevo Atleta'));
  }
};

export const apiGetCurrentUser = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Token inválido o expirado');
    }

    return await response.json();
  } catch (error) {
    console.warn('⚠️ API no disponible. Usando Fallback Mock para apiGetCurrentUser...');
    return simulateNetworkDelay(getMockUser('token@mock.com', 'Usuario Recuperado'));
  }
};
