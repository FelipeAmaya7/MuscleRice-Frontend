import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  // Función temporal para formatear precio si no viene formateado
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="product-card" data-id={product.id}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{formattedPrice}</p>
        <button className="btn-add-cart" onClick={onAdd}>Agregar al carrito</button>
      </div>
    </article>
  );
};

export default ProductCard;
