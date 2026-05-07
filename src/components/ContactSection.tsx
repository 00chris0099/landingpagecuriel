const contactItems = [
  ['WhatsApp', '+51 999 999 999', 'https://wa.me/51999999999?text=Hola,%20quiero%20cotizar%20una%20inspección%20para%20mi%20departamento'],
  ['Correo', 'info@inspekta.pe', 'mailto:info@inspekta.pe'],
  ['Cobertura', 'Lima Metropolitana', '#'],
];

import { ScrollReveal } from './ScrollReveal';

export default function ContactSection() {
  return (
    <section id="contacto" className="page-section">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ScrollReveal>
            <div className="surface-card p-6 sm:p-8">
              <span className="eyebrow mb-4">Contacto</span>
              <h2 className="section-title mb-4">
                Agenda una inspección con una conversación <span style={{ color: 'var(--primary-accent)' }}>clara y directa</span>.
              </h2>
              <p className="section-copy mb-8">
                Si ya tienes fecha de entrega, visita o firma, este es el mejor momento para coordinar la revisión.
              </p>

              <div className="space-y-4">
                {contactItems.map(([label, value, href], index) => (
                  <div key={label} className="surface-card p-4 shadow-none">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A85D]">0{index + 1} · {label}</div>
                    {href === '#' ? (
                      <p className="text-[#17324A]">{value}</p>
                    ) : (
                      <a href={href} className="text-[#17324A] hover:text-[#102333]">{value}</a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="surface-card p-6 sm:p-8">
              <h3 className="mb-6 text-2xl font-heading italic text-[#17324A]">Solicita tu inspección</h3>
              <form className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-[#17324A]">
                    <span>Nombre completo</span>
                    <input className="rounded-2xl border border-[rgba(23,50,74,0.15)] bg-white px-4 py-3 outline-none transition focus:border-[#17324A]" type="text" placeholder="Tu nombre" required />
                  </label>
                  <label className="grid gap-2 text-sm text-[#17324A]">
                    <span>Teléfono</span>
                    <input className="rounded-2xl border border-[rgba(23,50,74,0.15)] bg-white px-4 py-3 outline-none transition focus:border-[#17324A]" type="tel" placeholder="Tu número" required />
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-[#17324A]">
                  <span>Distrito</span>
                  <input className="rounded-2xl border border-[rgba(23,50,74,0.15)] bg-white px-4 py-3 outline-none transition focus:border-[#17324A]" type="text" placeholder="Distrito del departamento" required />
                </label>
                <label className="grid gap-2 text-sm text-[#17324A]">
                  <span>Tipo de inmueble</span>
                  <select className="rounded-2xl border border-[rgba(23,50,74,0.15)] bg-white px-4 py-3 outline-none transition focus:border-[#17324A]" required>
                    <option value="">Selecciona una opción</option>
                    <option value="nuevo">Departamento nuevo</option>
                    <option value="usado">Departamento usado</option>
                    <option value="alquiler">Departamento para alquilar</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-[#17324A]">
                  <span>Mensaje</span>
                  <textarea className="min-h-32 rounded-2xl border border-[rgba(23,50,74,0.15)] bg-white px-4 py-3 outline-none transition focus:border-[#17324A]" placeholder="Cuéntanos en qué etapa estás y qué necesitas revisar." required />
                </label>
                <button type="submit" className="btn-primary inline-flex items-center justify-center px-6 py-3.5 text-base font-medium">
                  Enviar consulta
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
