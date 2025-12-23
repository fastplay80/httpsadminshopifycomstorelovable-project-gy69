import { Helmet } from 'react-helmet-async';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ShopByMood from '@/components/home/ShopByMood';
import BestSellers from '@/components/home/BestSellers';
import WhyMinnlea from '@/components/home/WhyMinnlea';
import Awards from '@/components/home/Awards';
import LifestyleEditorial from '@/components/home/LifestyleEditorial';
import SocialProof from '@/components/home/SocialProof';
import EmailCapture from '@/components/home/EmailCapture';

const Index = () => {
  const config = {
    shippingThreshold: 59,
    cartItemsCount: 0,
  };

  return (
    <>
      <Helmet>
        <title>Minnelea | Conserve Artigianali dal Cilento - Confetture, Sott'oli, Sughi</title>
        <meta 
          name="description" 
          content="Scopri le conserve artigianali Minnelea: confetture, sott'oli, creme salate e sughi dal Parco Nazionale del Cilento. Ingredienti italiani, piccoli lotti, qualità premiata. Spedizione gratuita da €59." 
        />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minnelea.it/" />
        <meta property="og:title" content="Minnelea | Conserve Artigianali dal Cilento" />
        <meta 
          property="og:description" 
          content="Confetture, sott'oli, creme salate e sughi artigianali dal Parco Nazionale del Cilento. Qualità premiata con Great Taste Awards." 
        />
        <meta property="og:image" content="https://minnelea.it/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Minnelea | Conserve Artigianali dal Cilento" />
        <meta 
          name="twitter:description" 
          content="Confetture, sott'oli, creme salate e sughi artigianali dal Parco Nazionale del Cilento." 
        />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://minnelea.it/" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Minnelea",
            "url": "https://minnelea.it",
            "logo": "https://minnelea.it/logo.png",
            "description": "Conserve artigianali dal Parco Nazionale del Cilento",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Campania",
              "addressCountry": "IT"
            },
            "sameAs": [
              "https://instagram.com/minnelea",
              "https://facebook.com/minnelea"
            ]
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Minnelea",
            "url": "https://minnelea.it",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://minnelea.it/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <AnnouncementBar shippingThreshold={config.shippingThreshold} />
        <Header cartItemsCount={config.cartItemsCount} />
        
        <main id="main-content">
          <Hero shippingThreshold={config.shippingThreshold} />
          <ShopByMood />
          <BestSellers />
          <WhyMinnlea />
          <Awards />
          <LifestyleEditorial />
          <SocialProof />
          <EmailCapture />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
