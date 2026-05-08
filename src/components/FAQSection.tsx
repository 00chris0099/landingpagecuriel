'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '¿Cuánto dura una inspección?',
    a: 'Entre 1.5 y 3 horas según el tamaño y complejidad del departamento. Al terminar, tienes todo registrado.',
  },
  {
    q: '¿Qué necesito para agendar?',
    a: 'Nombre, teléfono y tipo de inmueble. Con eso coordinamos rápido por WhatsApp.',
  },
  {
    q: '¿Sirve para reclamar a la inmobiliaria?',
    a: 'Sí. Las observaciones documentadas te ayudan a sustentar reclamos y pedir correcciones antes de aceptar la entrega.',
  },
  {
    q: '¿Inspeccionan departamentos nuevos y usados?',
    a: 'Sí, ambos. Ajustamos el enfoque según el tipo de inmueble y el momento en que nos contactas.',
  },
  {
    q: '¿El informe incluye fotos?',
    a: 'Sí. El informe visual incluye fotografías de cada observación para que puedas revisarlas con claridad y usarlas como respaldo.',
  },
  {
    q: '¿Qué pasa si no encuentran nada?',
    a: 'Igual de valioso. Tendrás certeza técnica de que el inmueble está en buenas condiciones antes de firmar.',
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="faq-q-num">0{index + 1}</span>
        <span className="faq-q-text">{item.q}</span>
        <span className="faq-arrow">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="faq-answer">
          <p>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="preguntas" className="faq-section">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-intro">
            <span className="eyebrow">PREGUNTAS</span>
            <h2 className="section-title faq-title">
              Respuestas claras<br />
              <em>para decidir mejor.</em>
            </h2>
            <p className="section-copy">
              Si estás a punto de firmar, recibir o alquilar, estas son las dudas más comunes.
            </p>
            <a
              href="https://wa.me/51999999999?text=Hola,%20tengo%20una%20duda%20sobre%20la%20inspección"
              className="faq-wa-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/image/icons/clipboard-check.png" alt="" className="faq-wa-icon" />
              ¿Tienes otra duda? Escríbenos por WhatsApp.
            </a>
          </div>

          <div className="faq-list">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
