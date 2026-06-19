import { Link } from 'react-router-dom';

function CategoriasPage() {
  return (
    <>
      

      {/* ═══ PÁGINA DE CATEGORÍAS ═══ */}
      <main className="elite-cat-page">

          {/* Hero */}
          <div className="elite-cat-page-hero">
              <div className="elite-container">
                  <nav className="elite-breadcrumb" aria-label="Breadcrumb">
                      <Link to="/">Inicio</Link>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      <span>Categorías</span>
                  </nav>
                  <h1 className="elite-cat-page-title">Nuestras <span>Categorías</span></h1>
                  <p className="elite-cat-page-sub">Encuentra el suplemento perfecto según tu objetivo de entrenamiento</p>
              </div>
          </div>

          {/* Categories Grid */}
          <section className="elite-cat-page-grid" id="categorias-grid">
              <div className="elite-container">

                  <Link to="/" className="elite-back-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Volver al Inicio
                  </Link>

                  <div className="elite-cat-grid">

                      {/* Card 1: PROTEÍNAS */}
                      <Link to="/productos?cat=proteinas" className="elite-cat-card" id="cat-proteinas">
                          <div className="elite-cat-icon elite-cat-icon--proteinas">💪</div>
                          <h2 className="elite-cat-label">Proteínas</h2>
                          <p className="elite-cat-desc">Whey, Caseína, Vegetal. Alimenta tu músculo con la mejor proteína del mercado.</p>
                          <span className="elite-cat-count">4+ Productos</span>
                          <div className="elite-cat-img-wrap">
                              <img src="/img/whey protein.webp" alt="Proteínas MuscleRice" className="elite-cat-img" loading="lazy" />
                          </div>
                          <span className="elite-cat-cta">
                              Explorar
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </span>
                      </Link>

                      {/* Card 2: LIMPIAS */}
                      <Link to="/productos?cat=limpias" className="elite-cat-card" id="cat-limpias">
                          <div className="elite-cat-icon elite-cat-icon--limpias">🌿</div>
                          <h2 className="elite-cat-label">Limpias</h2>
                          <p className="elite-cat-desc">Orgánico y saludable. Proteína vegetal, avena + proteína, colágeno natural.</p>
                          <span className="elite-cat-count">3+ Productos</span>
                          <div className="elite-cat-img-wrap">
                              <img src="/img/Proteína Vegetal (Orgain o Vega 2lb).webp" alt="Limpias Organic MuscleRice" className="elite-cat-img" loading="lazy" />
                          </div>
                          <span className="elite-cat-cta">
                              Explorar
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </span>
                      </Link>

                      {/* Card 3: DEFINICIÓN */}
                      <Link to="/productos?cat=definicion" className="elite-cat-card" id="cat-definicion">
                          <div className="elite-cat-icon elite-cat-icon--definicion">🔥</div>
                          <h2 className="elite-cat-label">Definición</h2>
                          <p className="elite-cat-desc">Quemadores y lipotrópicos. Lipo6, termogénicos y fórmulas de corte muscular.</p>
                          <span className="elite-cat-count">2+ Productos</span>
                          <div className="elite-cat-img-wrap">
                              <img src="/img/Quemador de grasa Lipo6 (60 cápsulas).webp" alt="Definición Quemadores MuscleRice" className="elite-cat-img" loading="lazy" />
                          </div>
                          <span className="elite-cat-cta">
                              Explorar
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </span>
                      </Link>

                      {/* Card 4: ENERGY */}
                      <Link to="/productos?cat=energy" className="elite-cat-card" id="cat-energy">
                          <div className="elite-cat-icon elite-cat-icon--energy">⚡</div>
                          <h2 className="elite-cat-label">Energy</h2>
                          <p className="elite-cat-desc">Pre-entrenos, C4 Original y fórmulas de energía explosiva para tu workout.</p>
                          <span className="elite-cat-count">3+ Productos</span>
                          <div className="elite-cat-img-wrap">
                              <img src="/img/Pre-entreno C4 Original (30 servicios).webp" alt="Energy Pre-Entrenos MuscleRice" className="elite-cat-img" loading="lazy" />
                          </div>
                          <span className="elite-cat-cta">
                              Explorar
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </span>
                      </Link>

                  </div>

              </div>
          </section>

      </main>

      
    </>
  );
}

export default CategoriasPage;
