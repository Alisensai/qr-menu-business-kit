import { ContactSection } from "@/components/landing/ContactSection";
import { DemoRestaurantsSection } from "@/components/landing/DemoRestaurantsSection";
import { DemoPreview } from "@/components/landing/DemoPreview";
import { FAQ } from "@/components/landing/FAQ";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { Hero } from "@/components/landing/Hero";
import { PricingSection } from "@/components/landing/PricingSection";
import { WhyNeeded } from "@/components/landing/WhyNeeded";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <DemoPreview />
        <DemoRestaurantsSection />
        <WhyNeeded />
        <PricingSection />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
