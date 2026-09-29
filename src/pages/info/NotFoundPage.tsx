import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@/styles/pages/_not-found.css';

const CATEGORIAS = [
  { slug: 'proteinas', label: 'Proteínas' },
  { slug: 'rendimiento', label: 'Rendimiento' },
  { slug: 'energy', label: 'Energy' },
  { slug: 'definicion', label: 'Definición' },
  { slug: 'limpias', label: 'Limpias' },
];

function NotFoundPage() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  // Envía la búsqueda al catálogo: /productos?q=creatina
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const termino = busqueda.trim();
    navigate(termino ? `/productos?q=${encodeURIComponent(termino)}` : '/productos');
  };

  return (
    <main className="nf-page">
      <div className="nf-card">
        <p className="nf-code" aria-hidden="true">404</p>
        <h1 className="nf-title">Esta página se saltó el entreno</h1>
        <p className="nf-text">
          La dirección que buscas no existe o fue movida.
          Pero tranquilo, tus suplementos siguen aquí.
        </p>

        <form className="nf-search" onSubmit={handleSubmit} role="search">
          <label htmlFor="nf-search-input" className="nf-sr-only">Buscar productos</label>
          <input
            id="nf-search-input"
            type="search"
            placeholder="Buscar proteína, creatina…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary">Ir al inicio</Link>
          <Link to="/productos" className="nf-btn nf-btn--ghost">Ver productos</Link>
        </div>

        <nav className="nf-categories" aria-label="Categorías">
          <span>O explora una categoría:</span>
          <ul>
            {CATEGORIAS.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/productos?cat=${cat.slug}`}>{cat.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}

export default NotFoundPage;
