import { SiteFooter } from "@/components/layout/site-footer";
import {
  CareerPathsSection,
  FaqSection,
  HowItWorksSection,
  WhyChooseSection,
} from "@/features/landing/landing-sections";
import { HeroSection } from "@/features/landing/hero-section";
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
      <FaqSection />
      <NewsletterSection />
      <SiteFooter />
    </>
  );
}
