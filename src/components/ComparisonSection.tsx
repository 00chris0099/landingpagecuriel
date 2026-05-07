'use client';

import { useModal } from './ModalContext';

const withoutItems = [
  { icon: '/image/icons/warning.png', text: 'Descubres fallas graves después de firmar.' },
  { icon: '/image/icons/warning.png', text: 'Pagas reparaciones no presupuestadas.' },
  { icon: '/image/icons/warning.png', text: 'Pierdes poder de reclamo frente a la inmobiliaria.' },
  { icon: '/image/icons/warning.png', text: 'Decides a ciegas, sin información técnica.' },
];

const withItems = [
  { icon: '/image/icons/check-circle.png', text: 'Detectas problemas antes de comprometer tu dinero.' },
  { icon: '/image/icons/check-circle.png', text: 'Negocias mejor con evidencia real en mano.' },
  { icon: '/image/icons/check-circle.png', text: 'Reclamas con respaldo fotográfico y técnico.' },
  { icon: '/image/icons/check-circle.png', text: 'Decides con seguridad y tranquilidad total.' },
];

export default function ComparisonSection() {
  const { openModal } = useModal();

  return (
    <section className="comparison-section">
      <div className="container">

        <div className="comparison-header">
          <span className="eyebrow">COMPARACIÓN</span>
          <h2 className="section-title">
            Antes o después.<br />
            <em>La diferencia es enorme.</em>
          </h2>
        </div>

        <div className="comparison-cards">
          {/* WITHOUT */}
          <div className="cmp-card cmp-card--bad">
            <div className="cmp-card-badge cmp-badge--bad">SIN INSPECCIÓN</div>
            <p className="cmp-card-scenario">Lo que pasa cuando no revisas</p>
            <ul className="cmp-list">
              {withoutItems.map((item) => (
                <li key={item.text} className="cmp-item cmp-item--bad">
                  <img src={item.icon} alt="advertencia" className="cmp-item-icon" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="cmp-cost cmp-cost--bad">
              <span className="cmp-cost-label">Costo de errores:</span>
              <span className="cmp-cost-amount">S/ 8,000 – 25,000</span>
            </div>
          </div>

          {/* VS */}
          <div className="cmp-vs">VS</div>

          {/* WITH */}
          <div className="cmp-card cmp-card--good">
            <div className="cmp-card-badge cmp-badge--good">CON INSPECCIÓN</div>
            <p className="cmp-card-scenario">Lo que ganas cuando sí revisas</p>
            <ul className="cmp-list">
              {withItems.map((item) => (
                <li key={item.text} className="cmp-item cmp-item--good">
                  <img src={item.icon} alt="check" className="cmp-item-icon" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="cmp-cost cmp-cost--good">
              <span className="cmp-cost-label">Inversión:</span>
              <span className="cmp-cost-amount">Una fracción del ahorro</span>
            </div>
          </div>
        </div>

        <div className="comparison-cta">
          <button onClick={openModal} className="btn-primary">
            Quiero revisar antes de firmar
          </button>
        </div>

      </div>
    </section>
  );
}
