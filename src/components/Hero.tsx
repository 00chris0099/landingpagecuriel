'use client';

import { useModal } from './ModalContext';

const stats = [
  { value: '+200', label: 'Inspecciones realizadas' },
  { value: '98%', label: 'Clientes satisfechos' },
  { value: '24h', label: 'Informe entregado' },
];

export default function Hero() {
  const { openModal } = useModal();

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
              Inspecciones activas en Lima
            </div>

            <h1 className="hero-title">
              Si no revisas<br />
              <em className="hero-title-em">antes de firmar,</em><br />
              pagas el error después.
            </h1>

            <p className="hero-subtitle">
              Detectamos fallas ocultas en humedad, electricidad, gas y acabados — antes de que sean tu problema.
            </p>

            <div className="hero-proof-row">
              <div className="hero-proof-avatars">
                <span className="hero-proof-avatar">C</span>
                <span className="hero-proof-avatar">M</span>
                <span className="hero-proof-avatar">R</span>
              </div>
              <p className="hero-proof-text">
                <strong>+200 personas</strong> ya revisaron antes de firmar
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
              <span><img src="/image/icons/clock.png" alt="" className="hero-meta-icon" /> Informe en 24h</span>
              <span className="hero-meta-dot">·</span>
              <span><img src="/image/icons/check-circle.png" alt="" className="hero-meta-icon" /> Informe visual</span>
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
                  <div className="hero-stat-card-label">visual en 24h</div>
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
      </div>
    </section>
  );
}