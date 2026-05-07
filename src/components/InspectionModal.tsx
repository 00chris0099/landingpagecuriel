'use client';

import { useState, useEffect } from 'react';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InspectionModal({ isOpen, onClose }: InspectionModalProps) {
  const [form, setForm] = useState({ nombre: '', telefono: '', distrito: '', tipo: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `Hola, quiero agendar una inspección. Nombre: ${form.nombre}. Teléfono: ${form.telefono}. Distrito: ${form.distrito}. Tipo de inmueble: ${form.tipo}.`;
    setTimeout(() => {
      window.open(`https://wa.me/51999999999?text=${encodeURIComponent(msg)}`, '_blank');
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-header">
          <span className="modal-eyebrow">INSPECCIÓN TÉCNICA</span>
          <h2 className="modal-title">Agendemos tu revisión</h2>
          <p className="modal-subtitle">Coordinamos en menos de 24h. Sin compromisos.</p>
        </div>

        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <p>Redirigiendo a WhatsApp...</p>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-field">
              <label htmlFor="modal-nombre">Nombre completo</label>
              <input
                id="modal-nombre"
                type="text"
                placeholder="Tu nombre"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label htmlFor="modal-telefono">Teléfono / WhatsApp</label>
              <input
                id="modal-telefono"
                type="tel"
                placeholder="+51 9XX XXX XXX"
                required
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label htmlFor="modal-distrito">Distrito</label>
              <input
                id="modal-distrito"
                type="text"
                placeholder="Distrito del departamento"
                required
                value={form.distrito}
                onChange={(e) => setForm({ ...form, distrito: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label htmlFor="modal-tipo">Tipo de inmueble</label>
              <select
                id="modal-tipo"
                required
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="">Selecciona una opción</option>
                <option value="Departamento nuevo">Departamento nuevo</option>
                <option value="Departamento usado">Departamento usado</option>
                <option value="Departamento para alquilar">Departamento para alquilar</option>
                <option value="Casa">Casa</option>
              </select>
            </div>
            <button type="submit" className="modal-submit btn-primary">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Continuar por WhatsApp
            </button>
            <p className="modal-note">📍 Lima Metropolitana · Respuesta en menos de 2h</p>
          </form>
        )}
      </div>
    </div>
  );
}
