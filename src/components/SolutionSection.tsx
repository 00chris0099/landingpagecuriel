export default function SolutionSection() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="surface-card grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-12">
          <div>
            <span className="eyebrow mb-4">Solución</span>
            <h2 className="section-title mb-4">
              Revisamos el departamento con una mirada <span style={{ color: 'var(--primary-accent)' }}>técnica y precisa</span>.
            </h2>
            <p className="section-copy">
              Realizamos una inspección completa y entregamos observaciones claras para que puedas reclamar, negociar o decidir con mejor respaldo antes de comprometer tu dinero.
            </p>
          </div>

          <div className="rounded-[24px] border border-[rgba(23,50,74,0.12)] bg-[rgba(245,239,225,0.65)] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] bg-white/90 p-4 shadow-[0_16px_40px_rgba(23,50,74,0.05)]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A85D]">Diagnóstico</p>
                <p className="text-sm leading-6 text-[#17324A]">Checklist técnico, revisión visual y evaluación por zonas.</p>
              </div>
              <div className="rounded-[20px] bg-white/90 p-4 shadow-[0_16px_40px_rgba(23,50,74,0.05)]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A85D]">Entrega</p>
                <p className="text-sm leading-6 text-[#17324A]">Observaciones ordenadas para reclamar o negociar con claridad.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
