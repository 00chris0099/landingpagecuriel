'use client';

import { useModal } from './ModalContext';

const steps = [
  {
    num: '01',
    tag: 'Documentación previa.',
    title: 'Verificamos si el departamento cumple lo prometido',
    text: 'Solicitamos plano, minuta y cuadro de acabados para validar que el departamento cumpla con lo entregado y lo firmado.',
    icon: '/image/icons/folder-open.png',
  },
  {
    num: '02',
    tag: 'Protocolo técnico.',
    title: 'Inspección técnica de acabados',
    text: 'Evaluamos acabados, instalaciones y detalles visibles siguiendo criterios técnicos y protocolos de calidad.',
    icon: '/image/icons/ruler.png',
  },
  {
    num: '03',
    tag: 'Checklist validado.',
    title: 'Revisamos punto por punto',
    text: 'Revisamos punto por punto siguiendo protocolos de calidad.',
    icon: '/image/icons/search.png',
  },
  {
    num: '04',
    tag: 'Listo para sustentar.',
    title: 'Recibes el informe en 3 horas',
    text: 'Informe visual con fotos, hallazgos priorizados y sustento para corregir, reclamar o renegociar.',
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
                  <span>Protocolo técnico · Lima</span>
                </div>
                <div className="process-img-stat">
                  <span className="process-stat-num">+80</span>
                  <span className="process-stat-label">puntos verificados</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Title + Steps */}
          <div className="process-content-col">
            <span className="eyebrow">PROCESO</span>
            <h2 className="process-title">
              4 pasos para firmar<br />
              <em>con criterio técnico.</em>
            </h2>
            <p className="process-subtitle">
              Documento, inspección, evidencia y criterio técnico para decidir antes de asumir el riesgo.
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
