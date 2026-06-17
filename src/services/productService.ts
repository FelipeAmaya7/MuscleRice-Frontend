import { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Proteína Whey (2 LB)",
    price: 160000,
    image: "/img/whey protein.jpg",
    category: "proteinas"
  },
  {
    id: "prod-002",
    name: "Creatina Monohidratada Creapure (300g)",
    price: 95000,
    image: "/img/Creatina Monohidratada Creapure (300g).jpg",
    category: "rendimiento"
  },
  {
    id: "prod-003",
    name: "Colágeno Hidrolizado con Magnesio (300g)",
    price: 85000,
    image: "/img/Colágeno Hidrolizado con Magnesio (300g).jpg",
    category: "limpias"
  },
  {
    id: "prod-004",
    name: "Proteína Vegetal (Orgain o Vega 2 LB)",
    price: 135000,
    image: "/img/Proteína Vegetal (Orgain o Vega 2lb).jpg",
    category: "limpias"
  },
  {
    id: "prod-005",
    name: "Barra Proteica Quest (por diez und)",
    price: 90000,
    image: "/img/Barra Proteica Quest (por unidad) (1).jpg",
    category: "proteinas"
  },
  {
    id: "prod-006",
    name: "Pre-entreno C4 Original (30 servicios)",
    price: 125000,
    image: "/img/Pre-entreno C4 Original (30 servicios).jpg",
    category: "energy"
  },
  {
    id: "prod-007",
    name: "Quemador de grasa Lipo6 (60 cápsulas)",
    price: 105000,
    image: "/img/Quemador de grasa Lipo6 (60 cápsulas).jpg",
    category: "definicion"
  },
  {
    id: "prod-008",
    name: "Avena + Proteína (mezcla lista 1kg)",
    price: 55000,
    image: "/img/Avena + Proteína (mezcla lista 1kg).jpg",
    category: "limpias"
  }
];

// Fallback Mock helper: Retrasa la respuesta para simular carga de red
const simulateNetworkDelay = <T,>(data: T, ms: number = 1200): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
};

export const apiGetProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    return await response.json();
  } catch (error) {
    console.warn('⚠️ API no disponible. Usando Fallback Mock para apiGetProducts...');
    return simulateNetworkDelay(mockProducts);
  }
};
