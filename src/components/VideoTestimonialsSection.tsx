'use client';

import { useRef, useState } from 'react';

const videos = [
  {
    id: 1,
    src: '/videos/testimonio-1.mp4',
    title: 'Detectamos grietas antes de firmar',
    quote: '"Gracias a la inspección pude pedir S/ 8,000 de descuento."',
  },
  {
    id: 2,
    src: '/videos/testimonio-2.mp4',
    title: 'Fallas eléctricas invisibles',
    quote: '"No lo hubiera visto nunca. El inspector lo detectó en minutos."',
  },
  {
    id: 3,
    src: '/videos/testimonio-3.mp4',
    title: 'Humedad oculta en paredes',
    quote: '"Pensé que era un depa perfecto. No lo era."',
  },
  {
    id: 4,
    src: '/videos/testimonio-4.mp4',
    title: 'Inspección antes de las llaves',
    quote: '"Me ahorré una remodelación completa."',
  },
  {
    id: 5,
    src: '/videos/testimonio-5.mp4',
    title: 'Acabados deficientes detectados',
    quote: '"El informe me salvó de aceptar un departamento incompleto."',
  },
  {
    id: 6,
    src: '/videos/testimonio-6.mp4',
    title: 'Negocié con evidencia',
    quote: '"Fui a la inmobiliaria con fotos. Aceptaron reparar todo."',
  },
];

function VideoCard({ video, priority }: { video: typeof videos[0]; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setHasPlayed(true);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="testi-card" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={video.src}
        className="testi-video"
        playsInline
        muted
        preload={priority ? 'auto' : 'metadata'}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Gradient overlay always */}
      <div className="testi-gradient" />

      {/* Play button */}
      {!isPlaying && (
        <div className="testi-play-wrap">
          <button className="testi-play-btn" aria-label="Reproducir video">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}

      {/* Quote overlay */}
      {!hasPlayed && (
        <div className="testi-quote">
          <p>{video.quote}</p>
        </div>
      )}

      {/* Title at bottom */}
      <div className="testi-title">
        <span className="testi-title-tag">REAL</span>
        {video.title}
      </div>
    </div>
  );
}

export default function VideoTestimonialsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedVideos = showAll ? videos : videos.slice(0, 3);

  return (
    <section className="testi-section" id="testimonios">
      <div className="container">
        {/* Header */}
        <div className="testi-header">
          <span className="testi-eyebrow">EVIDENCIA REAL</span>
          <h2 className="testi-title-main">
            Personas que inspeccionaron<br />
            <em>antes de firmar.</em>
          </h2>
          <p className="testi-subtitle">
            No son actores. Son clientes reales que tomaron una mejor decisión.<br />
            Mira lo que encontramos en sus departamentos.
          </p>
        </div>

        {/* Videos grid */}
        <div className="testi-grid">
          {displayedVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} priority={index === 0} />
          ))}
        </div>

        {/* Show more */}
        {!showAll && videos.length > 3 && (
          <div className="testi-show-more">
            <button className="btn-ghost-light" onClick={() => setShowAll(true)}>
              Ver más testimonios ({videos.length - 3} más)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* CTA block */}
        <div className="testi-cta-block">
          <p className="testi-cta-label">¿Listo para revisar tu departamento?</p>
          <h3 className="testi-cta-heading">
            No firmes sin saber la verdad.
          </h3>
          <a
            href="https://wa.me/51999999999?text=Hola,%20vi%20los%20testimonios%20y%20quiero%20agendar%20una%20inspección%20para%20mi%20departamento"
            className="btn-primary testi-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Hablar con un inspector ahora
          </a>
          <p className="testi-cta-note">Respuesta en menos de 2 horas · Lima Metropolitana</p>
        </div>
      </div>
    </section>
  );
}