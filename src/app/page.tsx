import HeroSection from "@/components/landing/HeroSection";
import TrustedSection from "@/components/landing/TrustedSection";
import FeatureSection from "@/components/landing/FeatureSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AiShowcaseSection from "@/components/landing/AiShowcaseSection";
import DashboardPreviewSection from "@/components/landing/DashboardPreviewSection";
import HealthcareMapSection from "@/components/landing/HealthcareMapSection";
import EducationSection from "@/components/landing/EducationSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import FaqSection from "@/components/landing/FaqSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import FooterSection from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      <TrustedSection />
      <FeatureSection />
      <HowItWorksSection />
      <AiShowcaseSection />
      <DashboardPreviewSection />
      <HealthcareMapSection />
      <EducationSection />
      <TestimonialSection />
      <FaqSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  );
}