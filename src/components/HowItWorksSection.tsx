'use client';

import { useModal } from './ModalContext';

const steps = [
  {
    num: '01',
    tag: 'Gratis. Sin compromiso.',
    title: 'Agendas en 2 minutos',
    text: 'Escribes por WhatsApp o completas el formulario. Coordinamos fecha, hora y distrito.',
    icon: '/image/icons/calendar.png',
  },
  {
    num: '02',
    tag: 'Inspector certificado.',
    title: 'El inspector va al inmueble',
    text: 'Un técnico certificado visita el departamento con equipos reales y un protocolo probado.',
    icon: '/image/icons/buildings.png',
  },
  {
    num: '03',
    tag: '80+ puntos de revisión.',
    title: 'Revisamos punto por punto',
    text: 'Electricidad, agua, gas, humedad, acabados, puertas, pisos. Sin detalles omitidos.',
    icon: '/image/icons/search.png',
  },
  {
    num: '04',
    tag: 'Para renegociar o reclamar.',
    title: 'Recibes el informe en 24h',
    text: 'Informe visual con fotos, observaciones clasificadas y recomendaciones concretas.',
    icon: '/image/icons/file-pdf.png',
  },
];

export default function HowItWorksSection() {
  const { openModal } = useModal();

  return (
    <section id="como-funciona" className="process-section">
      <div className="container">
        <div className="process-layout">

          {/* LEFT — Inspector image */}
          <div className="process-visual-col">
            <div className="process-visual-sticky">
              <div className="process-img-frame">
                <img
                  src="/image/mockup3.png"
                  alt="Inspector técnico revisando departamento en Lima"
                  className="process-inspector-img"
                />
                <div className="process-img-badge">
                  <img src="/image/icons/seal-check.png" alt="certificado" className="process-badge-icon" />
                  <span>Inspector certificado · Lima</span>
                </div>
                <div className="process-img-stat">
                  <span className="process-stat-num">+80</span>
                  <span className="process-stat-label">puntos revisados</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Title + Steps */}
          <div className="process-content-col">
            <span className="eyebrow">PROCESO</span>
            <h2 className="process-title">
              4 pasos para saber<br />
              <em>la verdad de tu depa.</em>
            </h2>
            <p className="process-subtitle">
              Sin tecnicismos. Sin letra pequeña. Solo lo que ves y cómo usarlo.
            </p>

            <div className="process-steps">
              {steps.map((step) => (
                <article key={step.num} className="process-step">
                  <div className="process-step-num">{step.num}</div>
                  <div className="process-step-body">
                    <div className="process-step-top">
                      <img src={step.icon} alt={step.title} className="process-step-icon" />
                      <span className="process-step-tag">{step.tag}</span>
                    </div>
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-text">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <button onClick={openModal} className="btn-primary process-cta">
              Agendar inspección ahora
              <img src="/image/icons/calendar.png" alt="" className="btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}