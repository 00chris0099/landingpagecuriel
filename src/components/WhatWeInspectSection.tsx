'use client';

import { useModal } from './ModalContext';

const items = [
  {
    icon: '/image/icons/electricidad.png',
    num: '01',
    title: 'Instalaciones eléctricas',
    points: ['Tomacorrientes', 'Tablero', 'Interruptores', 'Señales de riesgo'],
  },
  {
    icon: '/image/icons/sanitaria.png',
    num: '02',
    title: 'Instalaciones sanitarias',
    points: ['Revisión de desagües', 'Revisión de agua', 'Detección de fugas', 'Verificación de sumideros'],
  },
  {
    icon: '/image/icons/acabados.png',
    num: '03',
    title: 'Acabados',
    featured: true,
    points: ['Puertas', 'Ventanas', 'Marcos', 'Sellados', 'Pisos', 'Grietas', 'Fisuras', 'Desniveles', 'Piezas sueltas', 'Calidad de instalación'],
  },
  {
    icon: '/image/icons/gas.png',
    num: '04',
    title: 'Instalación de gas',
    points: ['Puntos de gas', 'Conexiones', 'Ventilación', 'Riesgos visibles'],
  },
  {
    icon: '/image/icons/seguridad.png',
    num: '05',
    title: 'Seguridad general',
    points: ['Habitabilidad', 'Anclajes', 'Riesgo visible', 'Uso correcto'],
  },
];

export default function WhatWeInspectSection() {
  const { openModal } = useModal();

  return (
    <section id="que-revisamos" className="inspect-section">
      <div className="container">
        <div className="inspect-header">
          <span className="eyebrow">QUÉ REVISAMOS</span>
          <h2 className="section-title inspect-title">
            Cada punto que puede<br />
            <em>costarte dinero.</em>
          </h2>
          <p className="section-copy inspect-copy">
            Revisamos lo crítico para detectar observaciones, sustentar reclamos y evitar costos que después asumes tú.
          </p>
        </div>

        <div className="inspect-grid">
          {items.map((item) => (
            <article key={item.num} className={`inspect-card ${item.featured ? 'inspect-card--wide' : ''}`}>
              <div className="inspect-card-icon-wrap">
                <img src={item.icon} alt={item.title} className="inspect-card-icon" />
              </div>
              <div className="inspect-card-head">
                <span className="inspect-card-num">{item.num}</span>
                <h3 className="inspect-card-title">{item.title}</h3>
              </div>
              <ul className="inspect-card-list">
                {item.points.map((point) => (
                  <li key={point} className="inspect-card-point">{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="inspect-cta-row">
          <button onClick={openModal} className="btn-primary">
            Agendar inspección completa
          </button>
        </div>
      </div>
    </section>
  );
}
