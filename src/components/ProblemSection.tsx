'use client';

import { useModal } from './ModalContext';

const problems = [
  {
    icon: '/image/icons/filtraciones.png',
    cost: 'S/ 8,000+',
    title: 'Humedad y filtraciones',
    text: 'Aparece meses después. Ya firmaste. Ya es tu problema.',
  },
  {
    icon: '/image/icons/electricidad.png',
    cost: 'S/ 5,000+',
    title: 'Fallas eléctricas',
    text: 'Tomacorrientes sin continuidad, tableros deficientes. Invisible sin herramientas.',
  },
  {
    icon: '/image/icons/acabados.png',
    cost: 'S/ 12,000+',
    title: 'Acabados deficientes',
    text: 'Pintura mal sellada, enchapes flojos, pisos desnivelados.',
  },
  {
    icon: '/image/icons/puertas.png',
    cost: 'S/ 3,000+',
    title: 'Puertas y ventanas',
    text: 'Marcos desalineados, vidrios sin sellado, bisagras que fallan.',
  },
];

export default function ProblemSection() {
  const { openModal } = useModal();

  return (
    <section className="problem-section" data-section="problema">
      <div className="container">
        <div className="problem-intro">
          <span className="eyebrow">EL PROBLEMA</span>
          <h2 className="section-title problem-title">
            Lo que no ves hoy,<br />
            <em>lo pagas mañana.</em>
          </h2>
          <p className="section-copy problem-copy">
            El 73% de departamentos entregados en Lima tienen al menos una observación técnica grave.
            Sin inspección, ese costo es tuyo.
          </p>
        </div>

        <div className="problem-grid">
          {/* Main card with mockup */}
          <div className="problem-card problem-card--featured">
            <div className="problem-card-content">
              <div className="problem-card-header">
                <img src={problems[0].icon} alt="" className="problem-card-icn" />
                <span className="problem-card-cost">{problems[0].cost} en reparación</span>
              </div>
              <h3 className="problem-card-title">{problems[0].title}</h3>
              <p className="problem-card-text">{problems[0].text}</p>
              <button onClick={openModal} className="btn-primary problem-card-cta">
                Revisar antes de firmar
              </button>
            </div>
            <div className="problem-card-mockup">
              <img src="/image/mockup4.png" alt="Falla de humedad detectada" className="problem-mockup-img" />
            </div>
          </div>

          {/* Side cards */}
          <div className="problem-side-cards">
            {problems.slice(1).map((p) => (
              <div key={p.title} className="problem-card problem-card--side">
                <img src={p.icon} alt="" className="problem-side-icn" />
                <div className="problem-side-cost">{p.cost}</div>
                <h3 className="problem-side-title">{p.title}</h3>
                <p className="problem-side-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loss aversion bar */}
        <div className="problem-warning-bar">
          <img src="/image/icons/warning.png" alt="" className="problem-warning-icn" />
          <p className="problem-warning-text">
            <strong>Sin inspección, no tienes evidencia para reclamar.</strong> Una vez que firmas, el problema es tuyo.
          </p>
          <button onClick={openModal} className="btn-primary problem-warning-cta">
            Revisar mi depa
          </button>
        </div>
      </div>
    </section>
  );
}
