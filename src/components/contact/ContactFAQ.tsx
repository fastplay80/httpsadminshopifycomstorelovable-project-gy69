import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Quali sono i tempi di spedizione?",
    answer: "Spediamo entro 24-48 ore lavorative dall'ordine. La consegna avviene in 2-4 giorni lavorativi in tutta Italia. Per le isole potrebbero essere necessari 1-2 giorni aggiuntivi."
  },
  {
    question: "Spedite all'estero?",
    answer: "Sì, spediamo in tutta Europa. I tempi di consegna variano da 3 a 7 giorni lavorativi a seconda della destinazione. Contattaci per preventivi su spedizioni extra-UE."
  },
  {
    question: "Offrite sconti per ordini B2B?",
    answer: "Assolutamente sì. Per ristoranti, enoteche, negozi gourmet e altri rivenditori offriamo condizioni dedicate. Compila il form selezionando \"Collaborazioni B2B\" e ti contatteremo entro 24 ore."
  },
  {
    question: "I prodotti sono adatti a vegani?",
    answer: "La maggior parte delle nostre confetture e conserve sono vegane. Verifica sempre gli ingredienti sulla pagina prodotto. Alcune creme possono contenere derivati del latte."
  },
  {
    question: "Come posso tracciare il mio ordine?",
    answer: "Riceverai un'email con il tracking non appena il pacco viene spedito. Puoi seguire la consegna direttamente dal link fornito o contattandoci con il numero d'ordine."
  }
];

export const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4 block">
            FAQ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Domande frequenti
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-background border border-border/60 rounded-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left
                         hover:bg-secondary/30 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200
                            ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              
              <div 
                className={`grid transition-all duration-200 ease-out
                          ${openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
