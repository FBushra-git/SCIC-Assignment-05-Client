import { SiteFooter } from "@/components/layout/site-footer";
import {
  CareerPathsSection,
  FaqSection,
  HeroSection,
  HowItWorksSection,
  TestimonialsSection,
  WhyChooseSection,
} from "@/features/landing/landing-sections";
import { NewsletterSection } from "@/features/landing/newsletter-section";
import { StatisticsSection } from "@/features/landing/statistics-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <CareerPathsSection />
      <HowItWorksSection />
      <StatisticsSection />
      <TestimonialsSection />
      <FaqSection />
      <NewsletterSection />
      <SiteFooter />
    </>
  );
}