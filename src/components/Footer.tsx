export default function Footer() {
  return (
    <footer className="site-footer" data-section="footer">
      <div className="site-footer__ambient" aria-hidden="true" />
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand-col">
            <p className="site-footer__brand">DEPAINSPECT</p>
            <p className="site-footer__description">
              Inspección técnica de departamentos antes de comprar, recibir o alquilar. Claridad para decidir mejor.
            </p>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Navegación</h3>
            <ul className="site-footer__list">
              <li><a href="#hero" className="site-footer__link">Inicio</a></li>
              <li><a href="#que-revisamos" className="site-footer__link">Qué revisamos</a></li>
              <li><a href="#como-funciona" className="site-footer__link">Cómo funciona</a></li>
              <li><a href="#preguntas" className="site-footer__link">Preguntas</a></li>
            </ul>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Servicio</h3>
            <ul className="site-footer__list">
              <li>Compra de departamento</li>
              <li>Entrega de inmueble</li>
              <li>Inspección de acabados</li>
              <li>Informe técnico visual</li>
            </ul>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Contacto</h3>
            <div className="site-footer__list">
              <a href="https://wa.me/51999999999?text=Hola" className="site-footer__link">+51 999 999 999</a>
              <a href="mailto:info@inspekta.pe" className="site-footer__link">info@inspekta.pe</a>
              <span>Lima Metropolitana</span>
            </div>
          </div>
        </div>

        <div className="site-footer__social-row">
          <h3 className="site-footer__social-title">Síguenos</h3>
          <div className="site-footer__social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="site-footer__social-link">
              <img src="/image/redes/instagram.png" alt="Instagram" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="site-footer__social-link">
              <img src="/image/redes/tiktok.png" alt="TikTok" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="site-footer__social-link">
              <img src="/image/redes/facebook.png" alt="Facebook" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="site-footer__social-link">
              <img src="/image/redes/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="https://wa.me/51999999999?text=Hola" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="site-footer__social-link">
              <img src="/image/redes/whatsapp.png" alt="WhatsApp" />
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 DepaInspect. Todos los derechos reservados.</p>
          <div className="site-footer__bottom-links">
            <a href="#" className="site-footer__meta-link">Términos</a>
            <a href="#" className="site-footer__meta-link">Privacidad</a>
            <a href="#contacto" className="site-footer__meta-link">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
