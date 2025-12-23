import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  shop: {
    title: 'Shop',
    links: [
      { name: 'Confetture', href: '/collezioni/confetture' },
      { name: 'Sott\'oli', href: '/collezioni/sottoli' },
      { name: 'Creme Salate', href: '/collezioni/creme-salate' },
      { name: 'Sughi', href: '/collezioni/sughi' },
      { name: 'Box Regalo', href: '/collezioni/box-regalo' },
    ],
  },
  company: {
    title: 'Minnelea',
    links: [
      { name: 'La Nostra Storia', href: '/chi-siamo' },
      { name: 'I Nostri Premi', href: '/premi' },
      { name: 'Ingredienti', href: '/ingredienti' },
      { name: 'Blog & Ricette', href: '/blog' },
    ],
  },
  support: {
    title: 'Assistenza',
    links: [
      { name: 'Spedizioni', href: '/spedizioni' },
      { name: 'Resi e Rimborsi', href: '/resi' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contattaci', href: '/contatti' },
    ],
  },
  business: {
    title: 'Business',
    links: [
      { name: 'B2B & Ingrosso', href: '/b2b' },
      { name: 'Regali Aziendali', href: '/regali-aziendali' },
      { name: 'Diventa Rivenditore', href: '/rivenditori' },
    ],
  },
};

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/minnelea', icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com/minnelea', icon: Facebook },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-primary-foreground" role="contentinfo">
      {/* Main footer */}
      <div className="container-editorial section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <a href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-semibold">Minnelea</span>
            </a>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-xs">
              Conserve artigianali dal Parco del Cilento. 
              Piccoli lotti, ingredienti italiani, gusto autentico.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <a 
                href="mailto:info@minnelea.it" 
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@minnelea.it
              </a>
              <a 
                href="tel:+390000000000" 
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +39 000 000 0000
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Parco Nazionale del Cilento, Campania, Italia
              </p>
            </div>
            
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full
                           bg-primary-foreground/10 hover:bg-primary-foreground/20 
                           transition-colors"
                  aria-label={`Seguici su ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-serif text-lg font-medium mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground 
                               transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-editorial py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/60 text-center md:text-left">
              © {currentYear} Minnelea S.r.l. • P.IVA 00000000000 • Tutti i diritti riservati
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-primary-foreground/60">
              <a href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/cookie" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
              <a href="/termini" className="hover:text-primary-foreground transition-colors">
                Termini e Condizioni
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
