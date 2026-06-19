function Footer() {
  return (
    <footer className="footer-profesional" id="contacto">
      <div className="footer_top">
        <div className="container">
          <div className="footer-content">
            <nav className="footer-column" aria-label="Soporte y Ayuda">
              <h3>🧭 Soporte y Ayuda</h3>
              <ul>
                <li><a href="#faq"><i className="fa fa-circle" aria-hidden="true"></i>Preguntas frecuentes (FAQ)</a></li>
                <li><a href="#politicas"><i className="fa fa-circle" aria-hidden="true"></i>Envíos y devoluciones</a></li>
                <li><a href="#contacto"><i className="fa fa-circle" aria-hidden="true"></i>Contáctanos</a></li>
              </ul>
            </nav>
            <nav className="footer-column" aria-label="Sobre MuscleRice">
              <h3>🏪 Sobre MuscleRice</h3>
              <ul>
                <li><a href="#nosotros"><i className="fa fa-circle" aria-hidden="true"></i>Quiénes somos</a></li>
                <li><a href="#testimonios"><i className="fa fa-circle" aria-hidden="true"></i>Testimonios</a></li>
                <li><a href="#favoritos"><i className="fa fa-circle" aria-hidden="true"></i>Productos destacados</a></li>
              </ul>
            </nav>
            <div className="footer-column">
              <h3>☎️ Contáctanos</h3>
              <ul className="contact-info">
                <li><a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i>Colombia, Boyacá</a></li>
                <li><a href="tel:+573124567890"><i className="fa fa-phone" aria-hidden="true"></i>+57 3124567890</a></li>
                <li><a href="mailto:MuscleRice@gmail.com"><i className="fa fa-envelope" aria-hidden="true"></i>MuscleRice@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copy_txt">
              <p>&copy; 2025 Designed by <span>MuscleRice</span></p>
            </div>
            <div className="payment-logos">
              <img src="/img/fedex.webp" alt="Envío por FedEx" className="payment-logo" />
              <img src="/img/master-card.webp" alt="Pago con Mastercard" className="payment-logo" />
              <img src="/img/paypal.webp" alt="Pago con PayPal" className="payment-logo" />
              <img src="/img/visa.webp" alt="Pago con Visa" className="payment-logo" />
              <img src="/img/american-express.webp" alt="Pago con American Express" className="payment-logo" />
              <img src="/img/dhl.webp" alt="Envío por DHL" className="payment-logo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
