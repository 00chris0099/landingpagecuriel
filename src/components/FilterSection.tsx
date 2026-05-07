export default function FilterSection() {
  return (
    <section className="page-section filter-section">
      <div className="container">
        <div className="filter-box">
          <h2 className="filter-title">¿Este servicio es para ti?</h2>
          
          <div className="filter-grid">
            <div className="filter-col filter-yes">
              <h3>SÍ, si:</h3>
              <ul>
                <li>Estás por comprar un departamento</li>
                <li>Vas a recibir entrega de obra nueva</li>
                <li>Estás por alquilar</li>
                <li>No quieres asumir errores ajenos</li>
              </ul>
            </div>
            
            <div className="filter-col filter-no">
              <h3>NO, si:</h3>
              <ul>
                <li>Solo tienes curiosidad</li>
                <li>No vas a comprar pronto</li>
                <li>Te da igual asumir costos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}