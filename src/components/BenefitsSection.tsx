'use client';

import { useModal } from './ModalContext';

const benefits = [
  {
    num: '01',
    icon: '/image/icons/save.png',
    title: 'Ahorras antes de firmar',
    text: 'Detectar fallas a tiempo te da poder de negociación. Pides descuentos o correcciones antes de comprometerte.',
    stat: 'S/ 6,000 ahorro promedio',
  },
  {
    num: '02',
    icon: '/image/icons/camera.png',
    title: 'Decides con evidencia',
    text: 'Tienes fotos, observaciones e informe visual para decidir con claridad. No "crees" que está bien. Lo sabes.',
    stat: 'Informe en 24h',
  },
  {
    num: '03',
    icon: '/image/icons/clipboard-check.png',
    title: 'Reclamas con respaldo',
    text: 'Puedes pedir correcciones antes de aceptar o cerrar la compra. Con evidencia real, no con palabras.',
    stat: 'Respaldo técnico',
  },
  {
    num: '04',
    icon: '/image/icons/seal-check.png',
    title: 'Proteges tu inversión',
    text: 'Evitas asumir costos que no deberían ser tuyos. El departamento más caro no debería costar más de lo justo.',
    stat: 'Tranquilidad total',
  },
];

export default function BenefitsSection() {
  const { openModal } = useModal();

  return (
    <section id="beneficios" className="benefits-section">
      <div className="container">

        {/* Header row */}
        <div className="benefits-header">
          <div className="benefits-header-text">
            <span className="eyebrow">BENEFICIOS</span>
            <h2 className="section-title benefits-title">
              Una inspección te da<br />
              <em>ventaja antes de firmar.</em>
            </h2>
            <p className="section-copy">
              No es un gasto. Es una decisión inteligente antes de asumir una compra grande.
            </p>
          </div>
          <div className="benefits-header-stats">
            <div className="benefits-macro-stat">
              <span className="benefits-macro-num">S/ 6,000</span>
              <span className="benefits-macro-label">ahorro promedio negociado</span>
            </div>
            <div className="benefits-macro-stat">
              <span className="benefits-macro-num">3–5×</span>
              <span className="benefits-macro-label">más valor que el costo</span>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="benefits-grid">
          {benefits.map((b) => (
            <div key={b.num} className="benefit-card">
              <div className="benefit-card-icon-wrap">
                <img src={b.icon} alt={b.title} className="benefit-card-icon" />
              </div>
              <span className="benefit-card-num">{b.num}</span>
              <h3 className="benefit-card-title">{b.title}</h3>
              <p className="benefit-card-text">{b.text}</p>
              <span className="benefit-card-stat">{b.stat}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="benefits-cta-row">
          <button onClick={openModal} className="btn-primary">
            Quiero inspeccionar mi depa
          </button>
          <p className="benefits-cta-note">Lima Metropolitana · Respuesta en menos de 2h</p>
        </div>
      </div>
    </section>
  );
}
