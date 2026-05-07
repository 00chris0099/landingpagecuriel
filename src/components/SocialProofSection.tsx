'use client';

import { useRef, useState } from 'react';

const videos = [
  {
    id: 1,
    src: '/videos/testimonio-1.mp4',
    title: 'Inspección antes de firmar',
  },
  {
    id: 2,
    src: '/videos/testimonio-2.mp4',
    title: 'Fallas detectadas a tiempo',
  },
  {
    id: 3,
    src: '/videos/testimonio-3.mp4',
    title: 'Decisión con más seguridad',
  },
];

function VideoCard({ video }: { video: typeof videos[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-card" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={video.src}
        className="video-element"
        playsInline
        muted
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />
      
      {!isPlaying && (
        <div className="video-overlay">
          <button className="play-button" aria-label="Reproducir video">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
      
      <div className="video-title">{video.title}</div>
    </div>
  );
}

export default function SocialProofSection() {
  return (
    <section className="video-testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">RESULTADOS REALES</span>
          <h2 className="section-title">
            Clientes que <span className="highlight">revisaron</span> antes de decidir.
          </h2>
          <p className="section-subtitle">
            Mira experiencias reales de personas que tomaron una mejor decisión después de revisar su inmueble.
          </p>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="video-cta">
          <a
            href="https://wa.me/51999999999?text=Hola,%20quiero%20revisar%20mi%20departamento"
            className="btn-primary"
          >
            Quiero revisar mi departamento
          </a>
          <p className="cta-text">
            Agenda una inspección antes de firmar o recibir las llaves.
          </p>
        </div>
      </div>
    </section>
  );
}