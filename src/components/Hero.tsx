'use client';

import { useState } from 'react';
import { useModal } from './ModalContext';

const stats = [
  { value: '+200', label: 'inspecciones' },
  { value: '98%', label: 'clientes satisfechos' },
  { value: '3 horas', label: 'informe técnico' },
];

const logos = [
  { src: '/image/logos/abril.png', alt: 'Abril Grupo Inmobiliario' },
  { src: '/image/logos/imagina.png', alt: 'Imagina' },
  { src: '/image/logos/tc.png', alt: 'Grupo T y C' },
  { src: '/image/logos/portales.png', alt: 'Los Portales' },
];

export default function Hero() {
  const { openModal } = useModal();
  const [form, setForm] = useState({ nombre: '', telefono: '', tipo: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `Hola, quiero agendar una inspección. Nombre: ${form.nombre}. Teléfono: ${form.telefono}. Tipo de inmueble: ${form.tipo}.`;
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background grid overlay */}
      <div className="hero-bg-grid" />

      <div className="container">
        <div className="hero-layout">
          {/* LEFT: Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Inspección previa a firma en Lima
            </div>

            <h1 className="hero-title">
              Detecta el riesgo<br />
              <em className="hero-title-em">antes de firmar</em><br />
              y evita pagarlo tú.
            </h1>

            <p className="hero-subtitle">
              Inspección técnica para detectar fallas, validar lo prometido y reclamar con evidencia antes de aceptar tu departamento.
            </p>

            <div className="hero-proof-row">
              <div className="hero-proof-avatars">
                <span className="hero-proof-avatar">C</span>
                <span className="hero-proof-avatar">M</span>
                <span className="hero-proof-avatar">R</span>
              </div>
              <p className="hero-proof-text">
                <strong>+200 clientes</strong> ya revisaron antes de firmar
              </p>
            </div>

            <div className="hero-actions">
              <button
                id="hero-cta-primary"
                onClick={openModal}
                className="btn-primary btn-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar inspección
              </button>
              <a href="#que-revisamos" className="btn-ghost">
                Ver qué revisamos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            <div className="hero-meta">
              <span><img src="/image/icons/map-pin.png" alt="" className="hero-meta-icon" /> Lima Metropolitana</span>
              <span className="hero-meta-dot">·</span>
              <span><img src="/image/icons/clock.png" alt="" className="hero-meta-icon" /> Informe en 3 horas</span>
              <span className="hero-meta-dot">·</span>
              <span><img src="/image/icons/check-circle.png" alt="" className="hero-meta-icon" /> Evidencia visual</span>
            </div>
          </div>

          {/* RIGHT: Mockup floating */}
          <div className="hero-visual">
            <div className="hero-mockup-wrap">
              <img
                src="/image/mockup1.png"
                alt="Inspección técnica de departamento - evidencia real"
                className="hero-mockup-img"
              />
              {/* Floating stat card */}
              <div className="hero-stat-card hero-stat-card--tl">
                <img src="/image/icons/search.png" alt="" className="hero-stat-card-icn" />
                <div>
                  <div className="hero-stat-card-value">+47 fallas</div>
                  <div className="hero-stat-card-label">detectadas este mes</div>
                </div>
              </div>
              <div className="hero-stat-card hero-stat-card--br">
                <img src="/image/icons/clipboard-check.png" alt="" className="hero-stat-card-icn" />
                <div>
                  <div className="hero-stat-card-value">Informe</div>
                  <div className="hero-stat-card-label">técnico en 3 horas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="hero-stats-strip">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat-item">
              <span className="hero-stat-value">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-logos-strip" aria-label="Respaldo visual de constructoras">
          {logos.map((logo) => (
            <div key={logo.alt} className="hero-logo-item">
              <img src={logo.src} alt={logo.alt} className="hero-logo-image" />
            </div>
          ))}
        </div>

        <div className="hero-form-shell surface-card">
          <div className="hero-form-copy">
            <span className="hero-form-kicker">Agenda rápida</span>
            <p className="hero-form-text">Déjanos 3 datos y seguimos por WhatsApp.</p>
          </div>

          <form className="hero-form" onSubmit={handleSubmit}>
            <label className="hero-form-field">
              <span>Nombre</span>
              <input
                type="text"
                placeholder="Tu nombre"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </label>

            <label className="hero-form-field">
              <span>Teléfono</span>
              <input
                type="tel"
                placeholder="+51 9XX XXX XXX"
                required
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
            </label>

            <label className="hero-form-field">
              <span>Tipo de inmueble</span>
              <select
                required
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="">Selecciona una opción</option>
                <option value="Departamento de estreno">Departamento de estreno</option>
                <option value="Departamento de segundo uso">Departamento de segundo uso</option>
              </select>
            </label>

            <button type="submit" className="btn-primary hero-form-submit">
              Continuar por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
