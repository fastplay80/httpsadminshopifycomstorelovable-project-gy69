import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AffiliateHero from "@/components/affiliate/AffiliateHero";
import WhoIsFor from "@/components/affiliate/WhoIsFor";
import WhyMinnlea from "@/components/affiliate/WhyMinnlea";
import AffiliateOffers from "@/components/affiliate/AffiliateOffers";
import HowWeWork from "@/components/affiliate/HowWeWork";
import WhatWeLookFor from "@/components/affiliate/WhatWeLookFor";
import AffiliateForm from "@/components/affiliate/AffiliateForm";

const Affiliate = () => {
  return (
    <>
      <Helmet>
        <title>Diventa Affiliate | Minnelea</title>
        <meta 
          name="description" 
          content="Unisciti al programma affiliate Minnelea. Cerchiamo persone autentiche che amano raccontare storie vere su prodotti fatti con cura." 
        />
      </Helmet>
      
      <Header />
      
      <main>
        <AffiliateHero />
        <WhoIsFor />
        <WhyMinnlea />
        <AffiliateOffers />
        <HowWeWork />
        <WhatWeLookFor />
        <AffiliateForm />
      </main>
      
      <Footer />
    </>
  );
};

export default Affiliate;
