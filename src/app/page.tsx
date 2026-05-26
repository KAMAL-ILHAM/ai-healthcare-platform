import HeroSection from "@/components/sections/HeroSection";
import FeatureSection from "@/components/sections/FeatureSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      {/* Feature section ditambahkan tepat di bawah hero */}
      <FeatureSection />
    </main>
  );
}