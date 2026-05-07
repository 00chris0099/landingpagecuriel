'use client';

import { useModal } from './ModalContext';

const items = [
  { icon: '/image/icons/electricidad.png', num: '01', title: 'Instalaciones eléctricas', description: 'Tomacorrientes, tablero, interruptores y señales de instalación deficiente.' },
  { icon: '/image/icons/sanitaria.png', num: '02', title: 'Instalaciones sanitarias', description: 'Presión de agua, desagües, griferías, fugas visibles y conexiones.' },
  { icon: '/image/icons/filtraciones.png', num: '03', title: 'Humedad y filtraciones', description: 'Manchas, filtraciones en muros, techos, pisos y zonas propensas.' },
  { icon: '/image/icons/acabados.png', num: '04', title: 'Acabados', description: 'Pintura, enchapes, sellados, nivelación y detalles de entrega.' },
  { icon: '/image/icons/puertas.png', num: '05', title: 'Puertas y ventanas', description: 'Apertura, cierre, ajuste, sellado, seguridad y marcos.' },
  { icon: '/image/icons/muro.png', num: '06', title: 'Pisos y paredes', description: 'Desniveles, grietas, fisuras, piezas sueltas y calidad de instalación.' },
  { icon: '/image/icons/gas.png', num: '07', title: 'Instalación de gas', description: 'Puntos de gas, ventilación, conexiones y posibles riesgos visibles.' },
  { icon: '/image/icons/seguridad.png', num: '08', title: 'Seguridad general', description: 'Condiciones que afectan seguridad, habitabilidad y uso correcto.' },
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
            No revisamos por revisar. Evaluamos las áreas críticas que impactan seguridad, valor y costos posteriores.
          </p>
        </div>

        <div className="inspect-grid">
          {items.map((item) => (
            <article key={item.num} className="inspect-card">
              <div className="inspect-card-icon-wrap">
                <img src={item.icon} alt={item.title} className="inspect-card-icon" />
              </div>
              <span className="inspect-card-num">{item.num}</span>
              <h3 className="inspect-card-title">{item.title}</h3>
              <p className="inspect-card-desc">{item.description}</p>
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