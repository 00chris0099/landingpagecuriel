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
import { ScrollReveal } from '@/components/ScrollReveal';
import TrackingProvider from '@/components/TrackingProvider';

export default function Home() {
  return (
    <ModalProvider>
      <TrackingProvider />
      <div className="min-h-screen">
        <Header />
        <main className="site-main">
          <Hero />
          <ScrollReveal className="reveal-section" delay={0}>
            <ProblemSection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={40}>
            <WhatWeInspectSection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={60}>
            <HowItWorksSection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={80}>
            <BenefitsSection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={100}>
            <ComparisonSection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={120}>
            <VideoTestimonialsSection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={140}>
            <StrongCTASection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={160}>
            <FAQSection />
          </ScrollReveal>
          <ScrollReveal className="reveal-section" delay={180}>
            <Footer />
          </ScrollReveal>
        </main>
        <FloatingWhatsApp />
      </div>
    </ModalProvider>
  );
}
