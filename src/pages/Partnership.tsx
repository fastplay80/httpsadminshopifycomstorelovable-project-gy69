import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PartnershipHero from "@/components/partnership/PartnershipHero";
import ExclusivityPolicy from "@/components/partnership/ExclusivityPolicy";
import HorecaStrategy from "@/components/partnership/HorecaStrategy";
import PartnerBenefits from "@/components/partnership/PartnerBenefits";
import PartnershipCharts from "@/components/partnership/PartnershipCharts";
import PartnershipPhilosophy from "@/components/partnership/PartnershipPhilosophy";
import PartnershipForm from "@/components/partnership/PartnershipForm";

const Partnership = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Diventa Partner | Minnelea - Conserve Artigianali dal Cilento</title>
        <meta 
          name="description" 
          content="Diventa partner Minnelea. Distribuzione esclusiva per enoteche, ristoranti e gastronomie selezionate. Un partner, un territorio." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://minnelea.it/partnership" />
      </Helmet>

      <Header />
      
      <main>
        <PartnershipHero onApplyClick={scrollToForm} />
        <ExclusivityPolicy />
        <HorecaStrategy />
        <PartnerBenefits />
        <PartnershipCharts />
        <PartnershipPhilosophy />
        <PartnershipForm ref={formRef} />
      </main>

      <Footer />
    </>
  );
};

export default Partnership;
