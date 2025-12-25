import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactFAQ } from "@/components/contact/ContactFAQ";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contatti | Minnelea - Conserve Artigianali dal Cilento</title>
        <meta 
          name="description" 
          content="Contatta Minnelea per informazioni sui nostri prodotti, ordini B2B o collaborazioni. Siamo qui per rispondere alle tue domande." 
        />
        <meta property="og:title" content="Contatti | Minnelea" />
        <meta property="og:description" content="Contatta Minnelea per informazioni sui nostri prodotti artigianali." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contatti Minnelea",
            "description": "Contatta Minnelea per informazioni sui prodotti",
            "url": window.location.href,
            "mainEntity": {
              "@type": "Organization",
              "name": "Minnelea",
              "email": "ciao@minnelea.it",
              "telephone": "+39 340 123 4567",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Campania",
                "addressCountry": "IT"
              }
            }
          })}
        </script>
      </Helmet>

      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-background">
        <ContactHero />
        
        {/* Divider */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
          <div className="h-px bg-border/60 w-full" />
        </div>

        {/* Form + Details */}
        <section className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-8">
                Inviaci un messaggio
              </h2>
              <ContactForm />
            </div>

            {/* Details */}
            <div className="lg:pl-8">
              <ContactDetails />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <ContactFAQ />
      </main>

      <Footer />
    </>
  );
};

export default Contact;
