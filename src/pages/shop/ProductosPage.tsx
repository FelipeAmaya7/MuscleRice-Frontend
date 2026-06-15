import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProductosPage() {
  const location = useLocation();

  useEffect(() => {
    // ── Filter chips ──
    const filterBtns = document.querySelectorAll('.elite-filter-chip');
    const productCards = document.querySelectorAll('.elite-product-card');
    const resultsCount = document.querySelector('.elite-results-count strong');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Toggle active state
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            let visibleCount = 0;

            productCards.forEach(function(card) {
                const htmlCard = card as HTMLElement;
                if (filter === 'todos' || htmlCard.getAttribute('data-category') === filter) {
                    htmlCard.style.display = '';
                    visibleCount++;
                } else {
                    htmlCard.style.display = 'none';
                }
            });

            if (resultsCount) resultsCount.textContent = visibleCount.toString();
        });
    });

    // ── Search ──
    const searchInput = document.getElementById('catalog-search') as HTMLInputElement;
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            let visibleCount = 0;

            productCards.forEach(function(card) {
                const htmlCard = card as HTMLElement;
                const nameElem = htmlCard.querySelector('.elite-product-name');
                const catElem = htmlCard.querySelector('.elite-product-cat');
                const name = nameElem ? nameElem.textContent?.toLowerCase() || '' : '';
                const cat = catElem ? catElem.textContent?.toLowerCase() || '' : '';
                
                if (name.indexOf(query) !== -1 || cat.indexOf(query) !== -1) {
                    htmlCard.style.display = '';
                    visibleCount++;
                } else {
                    htmlCard.style.display = 'none';
                }
            });

            // Reset filter chips
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            const allBtn = document.querySelector('[data-filter="todos"]');
            if (allBtn) allBtn.classList.add('active');

            if (resultsCount) resultsCount.textContent = visibleCount.toString();
        });
    }

    // ── Sort ──
    const sortSelect = document.getElementById('catalog-sort') as HTMLSelectElement;
    const grid = document.getElementById('product-grid');

    if (sortSelect && grid) {
        sortSelect.addEventListener('change', function() {
            const cards = Array.from(grid.querySelectorAll('.elite-product-card')) as HTMLElement[];
            const sortBy = this.value;

            cards.sort(function(a, b) {
                if (sortBy === 'precio-asc') {
                    return parseInt(a.dataset.price || '0') - parseInt(b.dataset.price || '0');
                } else if (sortBy === 'precio-desc') {
                    return parseInt(b.dataset.price || '0') - parseInt(a.dataset.price || '0');
                } else if (sortBy === 'nombre') {
                    const nameA = a.querySelector('.elite-product-name')?.textContent || '';
                    const nameB = b.querySelector('.elite-product-name')?.textContent || '';
                    return nameA.localeCompare(nameB);
                }
                return 0;
            });

            cards.forEach(function(card) {
                grid.appendChild(card);
            });
        });
    }

    // ── URL category filter ──
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const targetBtn = document.querySelector('[data-filter="' + catParam + '"]') as HTMLElement;
        if (targetBtn) targetBtn.click();
    }
  }, [location.search]);

  return (
    <>
      {/* ═══ HEADER ═══ */}
      

      {/* ═══ CATÁLOGO ═══ */}
      <main className="elite-catalog elite-catalog-page">

          {/* Hero */}
          <div className="elite-catalog-hero">
              <div className="elite-container">
                  <nav className="elite-breadcrumb" aria-label="Breadcrumb">
                      <Link to="/">Inicio</Link>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      <Link to="/categorias">Categorías</Link>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      <span>Catálogo</span>
                  </nav>
                  <h1 className="elite-catalog-title">Nuestro <span>Catálogo</span></h1>
                  <p className="elite-catalog-subtitle">Suplementos premium seleccionados para cada fase de tu entrenamiento</p>
              </div>
          </div>

          {/* Toolbar: Search + Filters + Sort */}
          <section className="elite-toolbar">
              <div className="elite-container">
                  <div className="elite-toolbar-inner">
                      {/* Search */}
                      <div className="elite-search">
                          <svg className="elite-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          </svg>
                          <input type="text" className="elite-search-input" id="catalog-search" placeholder="Buscar suplementos..." autoComplete="off" />
                      </div>

                      {/* Filter chips */}
                      <div className="elite-filters" id="catalog-filters" role="group" aria-label="Filtros de categoría">
                          <button className="elite-filter-chip active" data-filter="todos">Todos</button>
                          <button className="elite-filter-chip" data-filter="proteinas">Proteínas</button>
                          <button className="elite-filter-chip" data-filter="rendimiento">Rendimiento</button>
                          <button className="elite-filter-chip" data-filter="definicion">Definición</button>
                          <button className="elite-filter-chip" data-filter="energy">Energy</button>
                          <button className="elite-filter-chip" data-filter="limpias">Limpias</button>
                      </div>

                      {/* Sort */}
                      <div className="elite-sort">
                          <select className="elite-sort-select" id="catalog-sort" aria-label="Ordenar productos">
                              <option value="relevancia">Relevancia</option>
                              <option value="precio-asc">Precio: Menor a Mayor</option>
                              <option value="precio-desc">Precio: Mayor a Menor</option>
                              <option value="nombre">Nombre A-Z</option>
                          </select>
                      </div>
                  </div>

                  <p className="elite-results-count">Mostrando <strong>8</strong> productos</p>
              </div>
          </section>

          {/* Products Grid */}
          <section className="elite-section">
              <div className="elite-container">
                  <div className="elite-product-grid" id="product-grid">

                      {/* ═══ Producto 1: Whey Protein ═══ */}
                      <article className="elite-product-card" data-category="proteinas" data-price="160000" id="product-whey">
                          <div className="elite-product-img-wrap">
                              <span className="elite-badge elite-badge--hot">Más Vendido</span>
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos" title="Favoritos">
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                                  </button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida" title="Vista rápida">
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                  </button>
                              </div>
                              <img src="/img/whey protein.jpg" alt="Proteína Whey (2 LB)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Proteínas</span>
                              <h3 className="elite-product-name">Proteína Whey (2 LB)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(42)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$160.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Proteína Whey al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                      {/* ═══ Producto 2: Creatina Monohidratada ═══ */}
                      <article className="elite-product-card" data-category="rendimiento" data-price="95000" id="product-creatina">
                          <div className="elite-product-img-wrap">
                              <span className="elite-badge elite-badge--new">Nuevo</span>
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                              </div>
                              <img src="/img/Creatina Monohidratada Creapure (300g).jpg" alt="Creatina Monohidratada Creapure (300g)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Rendimiento</span>
                              <h3 className="elite-product-name">Creatina Monohidratada Creapure (300g)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star elite-star--empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(28)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$95.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Creatina al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                      {/* ═══ Producto 3: Colágeno Hidrolizado ═══ */}
                      <article className="elite-product-card" data-category="limpias" data-price="85000" id="product-colageno">
                          <div className="elite-product-img-wrap">
                              <span className="elite-badge elite-badge--organic">Organic</span>
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                              </div>
                              <img src="/img/Colágeno Hidrolizado con Magnesio (300g).jpg" alt="Colágeno Hidrolizado con Magnesio (300g)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Limpias</span>
                              <h3 className="elite-product-name">Colágeno Hidrolizado con Magnesio (300g)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(15)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$85.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Colágeno al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                      {/* ═══ Producto 4: Proteína Vegetal ═══ */}
                      <article className="elite-product-card" data-category="limpias" data-price="135000" id="product-vegetal">
                          <div className="elite-product-img-wrap">
                              <span className="elite-badge elite-badge--organic">Organic</span>
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                              </div>
                              <img src="/img/Proteína Vegetal (Orgain o Vega 2lb).jpg" alt="Proteína Vegetal (Orgain o Vega 2 LB)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Limpias</span>
                              <h3 className="elite-product-name">Proteína Vegetal (Orgain o Vega 2 LB)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star elite-star--empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(19)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$135.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Proteína Vegetal al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                      {/* ═══ Producto 5: Barra Proteica Quest ═══ */}
                      <article className="elite-product-card" data-category="proteinas" data-price="90000" id="product-quest">
                          <div className="elite-product-img-wrap">
                              <span className="elite-badge elite-badge--sale">-10%</span>
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                              </div>
                              <img src="/img/Barra Proteica Quest (por unidad) (1).jpg" alt="Barra Proteica Quest (por 10 unidades)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Proteínas</span>
                              <h3 className="elite-product-name">Barra Proteica Quest (por 10 unidades)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(33)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$90.000</span>
                                  <span className="elite-product-price-old">$100.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Barra Proteica al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                      {/* ═══ Producto 6: Pre-entreno C4 ═══ */}
                      <article className="elite-product-card" data-category="energy" data-price="125000" id="product-c4">
                          <div className="elite-product-img-wrap">
                              <span className="elite-badge elite-badge--hot">Top Energía</span>
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                              </div>
                              <img src="/img/Pre-entreno C4 Original (30 servicios).jpg" alt="Pre-entreno C4 Original (30 servicios)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Energy</span>
                              <h3 className="elite-product-name">Pre-entreno C4 Original (30 servicios)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(56)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$125.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Pre-entreno C4 al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                      {/* ═══ Producto 7: Quemador Lipo6 ═══ */}
                      <article className="elite-product-card" data-category="definicion" data-price="105000" id="product-lipo6">
                          <div className="elite-product-img-wrap">
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                              </div>
                              <img src="/img/Quemador de grasa Lipo6 (60 cápsulas).jpg" alt="Quemador de grasa Lipo6 (60 cápsulas)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Definición</span>
                              <h3 className="elite-product-name">Quemador de grasa Lipo6 (60 cápsulas)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star elite-star--empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(21)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$105.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Lipo6 al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                      {/* ═══ Producto 8: Avena + Proteína ═══ */}
                      <article className="elite-product-card" data-category="limpias" data-price="55000" id="product-avena">
                          <div className="elite-product-img-wrap">
                              <span className="elite-badge elite-badge--sale">-15%</span>
                              <div className="elite-product-actions">
                                  <button className="elite-product-action-btn" aria-label="Agregar a favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                                  <button className="elite-product-action-btn" aria-label="Vista rápida"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                              </div>
                              <img src="/img/Avena + Proteína (mezcla lista 1kg).jpg" alt="Avena + Proteína (mezcla lista 1kg)" className="elite-product-img" loading="lazy" />
                          </div>
                          <div className="elite-product-body">
                              <span className="elite-product-cat">Limpias</span>
                              <h3 className="elite-product-name">Avena + Proteína (mezcla lista 1kg)</h3>
                              <div className="elite-product-rating">
                                  <div className="elite-stars">
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      <svg className="elite-star elite-star--empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                  <span className="elite-rating-count">(12)</span>
                              </div>
                              <div className="elite-product-price-row">
                                  <span className="elite-product-price">$55.000</span>
                                  <span className="elite-product-price-old">$65.000</span>
                              </div>
                              <button className="elite-add-cart" aria-label="Agregar Avena + Proteína al carrito">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                  Agregar al carrito
                              </button>
                          </div>
                      </article>

                  </div>
              </div>
          </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      
    </>
  );
}

export default ProductosPage;
