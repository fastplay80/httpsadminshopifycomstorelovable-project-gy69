import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs?: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  {
    question: 'È adatto ai vegani?',
    answer: 'Sì, tutti i nostri prodotti sono 100% vegetali e adatti a una dieta vegana.',
  },
  {
    question: 'Contiene glutine?',
    answer: 'I nostri prodotti non contengono glutine aggiunto. Verifica sempre l\'etichetta per informazioni specifiche sulle tracce.',
  },
  {
    question: 'Quanto dura dopo l\'apertura?',
    answer: 'Dopo l\'apertura, conservare in frigorifero e consumare entro 2-3 settimane per garantire la massima freschezza.',
  },
  {
    question: 'Perché si separa l\'olio in superficie?',
    answer: 'È un fenomeno naturale che indica l\'assenza di emulsionanti artificiali. Basta mescolare prima dell\'uso.',
  },
];

const ProductFAQ = ({ faqs = defaultFaqs }: ProductFAQProps) => {
  return (
    <div className="border-t border-border pt-8">
      <h2 className="font-serif text-xl font-medium mb-4">Domande Frequenti</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProductFAQ;
