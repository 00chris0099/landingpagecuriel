import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inspekta - Inspección Técnica de Departamentos',
  description: 'Servicio profesional de inspección técnica de departamentos antes de comprar, alquilar o recibir. Detectamos fallas ocultas para evitar gastos innecesarios.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-[--text-dark]">{children}</body>
    </html>
  );
}
