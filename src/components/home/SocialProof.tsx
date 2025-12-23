import { Star, ArrowRight, Quote } from 'lucide-react';

const reviews = [
  {
    author: 'Giulia M.',
    location: 'Milano',
    rating: 5,
    text: 'Finalmente delle confetture che sanno di frutta vera. La confettura di fico è diventata un must per le mie colazioni domenicali.',
  },
  {
    author: 'Marco R.',
    location: 'Roma',
    rating: 5,
    text: 'Ho regalato un box degustazione ai miei suoceri. Sono rimasti entusiasti. Qualità eccellente, packaging curatissimo.',
  },
  {
    author: 'Francesca L.',
    location: 'Bologna',
    rating: 5,
    text: 'I sott\'oli sono incredibili. Sapori intensi ma equilibrati. Perfetti per le mie cene con amici. Riacquisterò sicuramente.',
  },
];

const SocialProof = () => {
  return (
    <section 
      className="section-padding bg-muted/50"
      aria-labelledby="reviews-heading"
    >
      <div className="container-editorial">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 fill-primary text-primary" 
                />
              ))}
            </div>
            <span className="font-serif text-2xl font-medium text-foreground">
              5/5
            </span>
            <span className="text-muted-foreground">
              su Google Reviews
            </span>
          </div>
          
          <h2 
            id="reviews-heading"
            className="heading-section text-foreground mb-4"
          >
            Chi ci ha scelto, ci consiglia
          </h2>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {reviews.map((review, index) => (
            <article 
              key={index}
              className="bg-card p-6 rounded-sm shadow-subtle"
            >
              <Quote 
                className="w-8 h-8 text-primary/20 mb-4" 
                aria-hidden="true"
              />
              
              <div className="flex gap-0.5 mb-4" aria-label={`${review.rating} stelle su 5`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-primary text-primary" 
                  />
                ))}
              </div>
              
              <p className="text-foreground leading-relaxed mb-6">
                "{review.text}"
              </p>
              
              <footer className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {review.author}
                </span>
                <span>•</span>
                <span>{review.location}</span>
              </footer>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a 
            href="https://g.page/minnelea/review" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost gap-2"
          >
            Leggi tutte le recensioni
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
