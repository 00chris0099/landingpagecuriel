const benefits = [
  {
    icon: '/image/beneficios/instalaciónelectrica.png',
    title: '24h',
    subtitle: 'Entrega visual',
  },
  {
    icon: '/image/beneficios/Acabados.png',
    title: 'Check',
    subtitle: 'Puntos clave',
  },
  {
    icon: '/image/beneficios/seguridad.png',
    title: 'Claro',
    subtitle: 'Para decidir',
  },
];

export default function HeroBenefits() {
  return (
    <section className="hero-benefits-section">
      <div className="container">
        <div className="hero-benefits-grid">
          {benefits.map((benefit, index) => (
            <article key={index} className="hero-benefit-item">
              <div className="hero-benefit-icon">
                <img src={benefit.icon} alt={benefit.title} />
              </div>
              <span className="hero-benefit-title">{benefit.title}</span>
              <span className="hero-benefit-sub">{benefit.subtitle}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}