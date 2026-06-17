import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

function Header() {
  const { totalCount, totalPrice } = useCart();

  // Formatear precio para el Header
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(totalPrice);
  return (
    <header className="site-header">
      <section className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <nav aria-label="Enlaces superiores">
                <ul className="top-links">
                  <li><a href="#contacto"><i className="fa fa-headphones"></i> Servicio al cliente</a></li>
                  <li><a href="#contacto"><i className="fa fa-envelope-open"></i> Buzón de mensajes</a></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-3">
              <div className="icon social-list">
                <a href="#" aria-label="Facebook"><i className="fa fa-facebook"></i></a>
                <a href="#" aria-label="Twitter"><i className="fa fa-twitter"></i></a>
                <a href="#" aria-label="Google Plus"><i className="fa fa-google-plus"></i></a>
                <a href="#" aria-label="Linkedin"><i className="fa fa-linkedin"></i></a>
                <a href="#" aria-label="Blog"><i className="fa fa-rss"></i></a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="a-right account-actions">
                <Link to="/login" className="btn-auth" aria-label="Iniciar sesión">
                  <i className="fa fa-user-circle-o"></i>
                  <span>Iniciar sesión</span>
                </Link>
                <Link to="/registro" className="btn-auth btn-auth-register" aria-label="Crear cuenta">
                  <i className="fa fa-user-plus"></i>
                  <span>Crear cuenta</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="header header-main">
        <div className="container">
          <div className="row header-main-row">
            <div className="col-md-3 col-sm-12">
              <div className="logo">
                <Link to="/" className="site-logo">
                  <img src="/src/assets/images/ui/logo-musclerice..png" alt="MuscleRice" className="site-logo-img" />
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <nav aria-label="Navegación Principal">
                <ul className="nav navbar-nav main-nav">
                  <li className="active"><Link to="/">Inicio</Link></li>
                  <li><Link to="/categorias">Categorías</Link></li>
                  <li><Link to="/marcas">Marcas</Link></li>
                  <li><Link to="/ofertas">Ofertas</Link></li>
                  <li><a href="#" className="sale-link">Sale</a></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="cart header-cart">
                <Link to="/carrito" aria-label="Carrito de compras">
                  <span className="cart-icon-wrap">
                    <i className="fa fa-shopping-bag"></i>
                    <span className="cart-count">{totalCount}</span>
                  </span>
                  <span className="cart-price">{formattedPrice}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
