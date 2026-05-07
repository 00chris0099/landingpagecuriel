'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container">
        <div className="site-header__inner">
          <Link href="/" className="site-header__brand">
            <Image
              src="/logo.png"
              alt="DepaInspect"
              width={148}
              height={52}
              className="site-header__logo"
              priority
            />
          </Link>

          <nav className="site-header__nav">
            <Link href="#hero" className="site-header__link">Inicio</Link>
            <Link href="#que-revisamos" className="site-header__link">Qué revisamos</Link>
            <Link href="#como-funciona" className="site-header__link">Cómo funciona</Link>
            <Link href="#testimonios" className="site-header__link">Testimonios</Link>
            <Link href="#preguntas" className="site-header__link">Preguntas</Link>
          </nav>

          <div className="site-header__actions">
            <button
              id="header-cta"
              onClick={openModal}
              className="btn-primary site-header__cta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="site-header__cta-text">Agendar inspección</span>
              <span className="site-header__cta-mobile">Agendar</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="site-header__menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <span className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}>
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="site-header__mobile-nav">
          <div className="container">
            <Link href="#hero" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link href="#que-revisamos" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Qué revisamos</Link>
            <Link href="#como-funciona" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Cómo funciona</Link>
            <Link href="#testimonios" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Testimonios</Link>
            <Link href="#preguntas" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Preguntas</Link>
            <button
              onClick={() => { setMenuOpen(false); openModal(); }}
              className="btn-primary mobile-nav-cta"
            >
              Agendar inspección
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
