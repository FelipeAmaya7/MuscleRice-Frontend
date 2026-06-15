// HomePage.tsx — Migración 1:1 de home/index.html
// Regla: class → className | <img> autocerrados | Estructura DOM idéntica

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      

      <section className="hero-section" id="hero">
          <div className="hero-bg-deco" aria-hidden="true"></div>
          <div className="container">
              <div className="hero-grid">

                  {/* COLUMNA TEXTO */}
                  <div className="hero-text" id="hero-text">
                      <span className="hero-eyebrow">Activa tu mejor versión</span>

                      <h1 className="hero-headline">
                          No hay límites<br />para lo que<br />puedes lograr.
                      </h1>

                      <p className="hero-sub">Los límites los pones tú.</p>

                      <p className="hero-body">
                          Todo lo que te propones es posible con disciplina y mentalidad.
                          En MuscleRice te impulsamos a avanzar más rápido, más fuerte y sin excusas.
                      </p>

                      <p className="hero-tagline">
                          Suplementos de alta calidad y ropa deportiva diseñada para
                          acompañarte en cada paso de tu evolución.
                      </p>

                      <Link to="/productos" className="hero-cta" id="hero-cta">
                          Ver catálogo
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                  </div>

                  {/* COLUMNA IMAGEN */}
                  <div className="hero-image-col">
                      <div className="hero-img-wrapper" id="hero-img-wrapper">
                          <div className="hero-img-glow" aria-hidden="true"></div>
                          <picture>
                              <source srcSet="/img/Logo-Interfas.webp.webp" type="image/webp" />
                              <img
                                  src="/src/assets/images/ui/Logo-Interfas.webp.webp"
                                  alt="MuscleRice – Suplementos Premium"
                                  className="hero-img"
                                  id="hero-img"
                                  loading="eager"
                              />
                          </picture>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* ═══ CATEGORÍAS DESTACADAS (Elite) ═══ */}
      <section className="elite-categories elite-section" id="categorias-home">
          <div className="elite-container">
              <div className="elite-cat-header">
                  <span className="elite-cat-eyebrow">Categorías</span>
                  <h2 className="elite-cat-title">Encuentra tu <span>objetivo</span></h2>
                  <p className="elite-cat-subtitle">Selecciona tu categoría y descubre los suplementos diseñados para cada fase de tu entrenamiento</p>
              </div>
              <div className="elite-cat-grid">

                  {/* Proteínas */}
                  <Link to="/productos?cat=proteinas" className="elite-cat-card" id="home-cat-proteinas">
                      <div className="elite-cat-icon elite-cat-icon--proteinas">💪</div>
                      <h2 className="elite-cat-label">Proteínas</h2>
                      <p className="elite-cat-desc">Whey, Caseína, Vegetal. Alimenta tu músculo con la mejor proteína.</p>
                      <span className="elite-cat-count">4+ Productos</span>
                      <div className="elite-cat-img-wrap">
                          <img src="/img/whey protein.jpg" alt="Proteínas MuscleRice" className="elite-cat-img" loading="lazy" />
                      </div>
                      <span className="elite-cat-cta">
                          Explorar
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </span>
                  </Link>

                  {/* Limpias */}
                  <Link to="/productos?cat=limpias" className="elite-cat-card" id="home-cat-limpias">
                      <div className="elite-cat-icon elite-cat-icon--limpias">🌿</div>
                      <h2 className="elite-cat-label">Limpias</h2>
                      <p className="elite-cat-desc">Orgánico y saludable. Proteína vegetal, avena + proteína, colágeno.</p>
                      <span className="elite-cat-count">3+ Productos</span>
                      <div className="elite-cat-img-wrap">
                          <img src="/img/Proteína Vegetal (Orgain o Vega 2lb).jpg" alt="Limpias Organic" className="elite-cat-img" loading="lazy" />
                      </div>
                      <span className="elite-cat-cta">
                          Explorar
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </span>
                  </Link>

                  {/* Definición */}
                  <Link to="/productos?cat=definicion" className="elite-cat-card" id="home-cat-definicion">
                      <div className="elite-cat-icon elite-cat-icon--definicion">🔥</div>
                      <h2 className="elite-cat-label">Definición</h2>
                      <p className="elite-cat-desc">Quemadores y lipotrópicos. Lipo6, termogénicos y fórmulas de corte.</p>
                      <span className="elite-cat-count">2+ Productos</span>
                      <div className="elite-cat-img-wrap">
                          <img src="/img/Quemador de grasa Lipo6 (60 cápsulas).jpg" alt="Definición Quemadores" className="elite-cat-img" loading="lazy" />
                      </div>
                      <span className="elite-cat-cta">
                          Explorar
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </span>
                  </Link>

                  {/* Energy */}
                  <Link to="/productos?cat=energy" className="elite-cat-card" id="home-cat-energy">
                      <div className="elite-cat-icon elite-cat-icon--energy">⚡</div>
                      <h2 className="elite-cat-label">Energy</h2>
                      <p className="elite-cat-desc">Pre-entrenos, C4 Original y fórmulas de energía explosiva.</p>
                      <span className="elite-cat-count">3+ Productos</span>
                      <div className="elite-cat-img-wrap">
                          <img src="/img/Pre-entreno C4 Original (30 servicios).jpg" alt="Energy Pre-Entrenos" className="elite-cat-img" loading="lazy" />
                      </div>
                      <span className="elite-cat-cta">
                          Explorar
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </span>
                  </Link>

              </div>
          </div>
      </section>

      <section className="premium-skill-section" id="nosotros">
          <div className="container">
              <div className="premium-skill-grid-layout">

                  {/* ═══ COLUMNA IZQUIERDA: Texto persuasivo ═══ */}
                  <div className="premium-text-column">
                      <span className="premium-eyebrow">Nuestra Promesa</span>
                      <h2 className="premium-title">
                          ¿Por qué elegir<br />
                          <span className="mr-brand-accent">MuscleRice</span>?
                      </h2>
                      <p className="premium-desc">Porque creemos en tu progreso. En MuscleRice te damos suplementos de calidad, precios justos y un servicio cercano, para que te enfoques en lo más importante: <strong>superarte cada día.</strong></p>
                      <p className="premium-desc">Nuestra tienda está diseñada para que encuentres fácilmente los productos que necesitas según tus objetivos, con descripciones claras, recomendaciones personalizadas y envíos rápidos a todo el país.</p>
                      <p className="premium-desc premium-desc--cta"><strong>¡Confía en nosotros y lleva tu cuerpo al siguiente nivel!</strong></p>
                  </div>

                  {/* ═══ COLUMNA DERECHA: Cuadrícula 2×2 de habilidades ═══ */}
                  <div className="premium-cards-column">
                      <div className="skills-grid-2x2">

                          {/* Tarjeta 1 */}
                          <article className="skill-card">
                              <div className="skill-content-wrapper">
                                  <span className="skill-icon" aria-hidden="true">💪</span>
                                  <h3 className="skill-name">Asesoría Personalizada</h3>
                                  <p className="skill-sub">Suplementación guiada por expertos</p>
                                  <div className="skill-bar-track">
                                      <div className="skill-bar-fill" style={{ '--nivel': '95%' } as React.CSSProperties}></div>
                                  </div>
                              </div>
                          </article>

                          {/* Tarjeta 2 */}
                          <article className="skill-card">
                              <div className="skill-content-wrapper">
                                  <span className="skill-icon" aria-hidden="true">🚚</span>
                                  <h3 className="skill-name">Entregas Rápidas</h3>
                                  <p className="skill-sub">Envíos seguros a todo el país</p>
                                  <div className="skill-bar-track">
                                      <div className="skill-bar-fill" style={{ '--nivel': '90%' } as React.CSSProperties}></div>
                                  </div>
                              </div>
                          </article>

                          {/* Tarjeta 3 */}
                          <article className="skill-card">
                              <div className="skill-content-wrapper">
                                  <span className="skill-icon" aria-hidden="true">🌿</span>
                                  <h3 className="skill-name">Producto Local</h3>
                                  <p className="skill-sub">Apoyo al campo colombiano</p>
                                  <div className="skill-bar-track">
                                      <div className="skill-bar-fill" style={{ '--nivel': '100%' } as React.CSSProperties}></div>
                                  </div>
                              </div>
                          </article>

                          {/* Tarjeta 4 */}
                          <article className="skill-card">
                              <div className="skill-content-wrapper">
                                  <span className="skill-icon" aria-hidden="true">🛒</span>
                                  <h3 className="skill-name">Tienda 100% Online</h3>
                                  <p className="skill-sub">Compra fácil, desde cualquier lugar</p>
                                  <div className="skill-bar-track">
                                      <div className="skill-bar-fill" style={{ '--nivel': '98%' } as React.CSSProperties}></div>
                                  </div>
                              </div>
                          </article>

                      </div>
                  </div>

              </div>
          </div>
      </section>

      <section className="features" id="favoritos">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <span className="fav-eyebrow">⭐ Lo más elegido</span>
                      <h2 className="section-title fav-title">Nuestros Favoritos para<br />tu Rendimiento</h2>
                      <p className="section-subtitle">Suplementos de alta calidad seleccionados por nuestros atletas para maximizar cada entrenamiento</p>
                  </div>
              </div>
              <div className="row features-grid">

                  {/* Card 1: Whey Protein */}
                  <div className="col-md-4">
                      <article className="card" id="card-whey">
                          <div className="card-img-wrapper">
                              <span className="card-badge">Más Vendido</span>
                              <img src="/img/Avena + Proteína (mezcla lista 1kg).jpg" alt="Whey Protein" className="card-img" />
                              <div className="card-img-overlay"></div>
                          </div>
                          <div className="card-body">
                              <span className="card-category">Proteínas</span>
                              <h3 className="card-title">💪 Whey Protein</h3>
                              <p className="card-desc">Ideal para aumentar masa muscular y mejorar la recuperación después del entrenamiento.</p>
                              <Link to="/productos" className="card-btn" id="btn-whey">
                                  Ver más
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                              </Link>
                          </div>
                      </article>
                  </div>

                  {/* Card 2: Creatina */}
                  <div className="col-md-4">
                      <article className="card" id="card-creatina">
                          <div className="card-img-wrapper">
                              <span className="card-badge card-badge--green">Top Fuerza</span>
                              <img src="/img/Creatina Monohidratada Creapure (300g).jpg" alt="Creatina Monohidratada" className="card-img" />
                              <div className="card-img-overlay"></div>
                          </div>
                          <div className="card-body">
                              <span className="card-category">Rendimiento</span>
                              <h3 className="card-title">⚡ Creatina Monohidratada</h3>
                              <p className="card-desc">Perfecta para mejorar la fuerza, el rendimiento y acelerar el crecimiento muscular.</p>
                              <Link to="/productos" className="card-btn" id="btn-creatina">
                                  Ver más
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                              </Link>
                          </div>
                      </article>
                  </div>

                  {/* Card 3: Pre-Entreno */}
                  <div className="col-md-4">
                      <article className="card" id="card-pre">
                          <div className="card-img-wrapper">
                              <span className="card-badge card-badge--orange">Energía Total</span>
                              <img src="/img/Pre-entreno C4 Original (30 servicios).jpg" alt="Pre-Entreno C4" className="card-img" />
                              <div className="card-img-overlay"></div>
                          </div>
                          <div className="card-body">
                              <span className="card-category">Pre-Entreno</span>
                              <h3 className="card-title">🔥 Pre-Entreno C4</h3>
                              <p className="card-desc">Aumenta tu energía, enfoque y resistencia para entrenar al máximo nivel.</p>
                              <Link to="/productos" className="card-btn" id="btn-pre">
                                  Ver más
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                              </Link>
                          </div>
                      </article>
                  </div>

              </div>
          </div>
      </section>

      <section className="team">
         <div className="clear"></div>
          <div className="container">
             <div className="row">
                 <div className="col-md-12">
                     <h2 className="section-title">💪 TODO LO QUE TU CUERPO NECESITA PARA CREER, RENDIR Y RECUPERARSE 💥</h2>
                     <p className="section-subtitle">Suplementos de alta calidad para maximizar tu rendimiento</p>
                 </div>
             </div>
              <div className="row product-grid">
                  {/* Producto 1: Proteína Whey */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/whey protein.jpg" alt="Proteína Whey (2 LB)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Proteína Whey (2 LB)</h3>
                              <p className="product-price">$160.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
                  
                  {/* Producto 2: Creatina */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/Creatina Monohidratada Creapure (300g).jpg" alt="Creatina Monohidratada Creapure (300g)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Creatina Monohidratada Creapure (300g)</h3>
                              <p className="product-price">$95.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
                  
                  {/* Producto 3: Colágeno */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/Colágeno Hidrolizado con Magnesio (300g).jpg" alt="Colágeno Hidrolizado con Magnesio (300g)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Colágeno Hidrolizado con Magnesio (300g)</h3>
                              <p className="product-price">$85.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
                  
                  {/* Producto 4: Proteína Vegetal */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/Proteína Vegetal (Orgain o Vega 2lb).jpg" alt="Proteína Vegetal (Orgain o Vega 2 LB)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Proteína Vegetal (Orgain o Vega 2 LB)</h3>
                              <p className="product-price">$135.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
              </div>
              <div className="row product-grid">
                  {/* Producto 5: Barra Proteica Quest */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/Barra Proteica Quest (por unidad) (1).jpg" alt="Barra Proteica Quest (por diez und)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Barra Proteica Quest (por diez und)</h3>
                              <p className="product-price">$90.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
                  
                  {/* Producto 6: Pre-entreno C4 */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/Pre-entreno C4 Original (30 servicios).jpg" alt="Pre-entreno C4 Original (30 servicios)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Pre-entreno C4 Original (30 servicios)</h3>
                              <p className="product-price">$125.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
                  
                  {/* Producto 7: Quemador de Grasa */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/Quemador de grasa Lipo6 (60 cápsulas).jpg" alt="Quemador de grasa Lipo6 (60 cápsulas)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Quemador de grasa Lipo6 (60 cápsulas)</h3>
                              <p className="product-price">$105.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
                  
                  {/* Producto 8: Avena + Proteína */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                      <article className="product-card">
                          <div className="product-image-wrapper">
                              <img src="/img/Avena + Proteína (mezcla lista 1kg).jpg" alt="Avena + Proteína (mezcla lista 1kg)" className="product-image" />
                          </div>
                          <div className="product-info">
                              <h3 className="product-title">Avena + Proteína (mezcla lista 1kg)</h3>
                              <p className="product-price">$55.000</p>
                              <button className="btn-add-cart">Agregar al carrito</button>
                          </div>
                      </article>
                  </div>
              </div>
          </div>
      </section>

      
    </>
  );
}

export default HomePage;
