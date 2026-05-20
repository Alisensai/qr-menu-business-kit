import { ContactSection } from "@/components/landing/ContactSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
