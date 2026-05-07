export default function Footer() {
  return (
    <footer className="page-section border-t border-[rgba(23,50,74,0.1)] bg-[rgba(255,255,255,0.82)] backdrop-blur-sm">
      <div className="container footer-shell">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="mb-4 text-2xl font-heading italic text-[#17324A]">DEPAINSPECT</p>
            <p className="text-sm leading-6 text-[#5A6B7A]">
              Inspección técnica de departamentos antes de comprar, recibir o alquilar. Claridad para decidir mejor.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#17324A]">Navegación</h3>
            <ul className="space-y-2 text-sm text-[#5A6B7A]">
              <li><a href="#hero" className="hover:text-[#17324A]">Inicio</a></li>
              <li><a href="#que-revisamos" className="hover:text-[#17324A]">Qué revisamos</a></li>
              <li><a href="#como-funciona" className="hover:text-[#17324A]">Cómo funciona</a></li>
              <li><a href="#preguntas" className="hover:text-[#17324A]">Preguntas</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#17324A]">Servicio</h3>
            <ul className="space-y-2 text-sm text-[#5A6B7A]">
              <li>Compra de departamento</li>
              <li>Entrega de inmueble</li>
              <li>Inspección de acabados</li>
              <li>Informe técnico visual</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#17324A]">Contacto</h3>
            <div className="space-y-2 text-sm text-[#5A6B7A]">
              <a href="https://wa.me/51999999999?text=Hola" className="block hover:text-[#17324A]">+51 999 999 999</a>
              <a href="mailto:info@inspekta.pe" className="block hover:text-[#17324A]">info@inspekta.pe</a>
              <span className="block">Lima Metropolitana</span>
            </div>
          </div>
        </div>

        <div className="footer-social">
          <h3 className="footer-social-title">Síguenos</h3>
          <div className="footer-social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/image/redes/instagram.png" alt="Instagram" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <img src="/image/redes/tiktok.png" alt="TikTok" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/image/redes/facebook.png" alt="Facebook" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/image/redes/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="https://wa.me/51999999999?text=Hola" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <img src="/image/redes/whatsapp.png" alt="WhatsApp" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(23,50,74,0.1)] pt-6 text-xs text-[#5A6B7A] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DepaInspect. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#17324A]">Términos</a>
            <a href="#" className="hover:text-[#17324A]">Privacidad</a>
            <a href="#contacto" className="hover:text-[#17324A]">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}