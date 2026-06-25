import { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || "";

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
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.mensaje || 'Credenciales inválidas o servidor inalcanzable');
    }

    const data = await response.json();
    return {
      id: String(data.usuario.id),
      name: data.usuario.nombre,
      email: data.usuario.email,
      role: 'customer'
    };
  } catch (error: any) {
    console.warn('⚠️ API no disponible o error. Usando Fallback Mock para apiLogin...', error);
    if (error.message && error.message !== 'Failed to fetch') {
      throw error;
    }
    return simulateNetworkDelay(getMockUser(email));
  }
};

export const apiRegister = async (userData: Partial<User> & { password?: string }): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/api/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: userData.name,
        email: userData.email,
        password: userData.password
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.mensaje || 'Error al registrar usuario');
    }

    const data = await response.json();
    return {
      id: String(data.id),
      name: userData.name || '',
      email: userData.email || '',
      role: 'customer'
    };
  } catch (error: any) {
    console.warn('⚠️ API no disponible o error. Usando Fallback Mock para apiRegister...', error);
    if (error.message && error.message !== 'Failed to fetch') {
      throw error;
    }
    return simulateNetworkDelay(getMockUser(userData.email || 'correo@nuevo.com', userData.name || 'Nuevo Atleta'));
  }
};

export const apiGetCurrentUser = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/api/usuario/${token}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Usuario no encontrado o sesión expirada');
    }

    const data = await response.json();
    return {
      id: String(data.id),
      name: data.nombre,
      email: data.email,
      role: 'customer'
    };
  } catch (error) {
    console.warn('⚠️ API no disponible. Usando Fallback Mock para apiGetCurrentUser...');
    return simulateNetworkDelay(getMockUser('token@mock.com', 'Usuario Recuperado'));
  }
};
