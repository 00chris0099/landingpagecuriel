import { ModalProvider } from '@/components/ModalContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import WhatWeInspectSection from '@/components/WhatWeInspectSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import BenefitsSection from '@/components/BenefitsSection';
import ComparisonSection from '@/components/ComparisonSection';
import VideoTestimonialsSection from '@/components/VideoTestimonialsSection';
import StrongCTASection from '@/components/StrongCTASection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <ModalProvider>
      <div className="min-h-screen">
        <Header />
        <main className="site-main">
          <Hero />
          <ProblemSection />
          <WhatWeInspectSection />
          <HowItWorksSection />
          <BenefitsSection />
          <ComparisonSection />
          <VideoTestimonialsSection />
          <StrongCTASection />
          <FAQSection />
          <Footer />
        </main>
        <FloatingWhatsApp />
      </div>
    </ModalProvider>
  );
}