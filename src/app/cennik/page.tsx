// src/app/cennik/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Start",
    price: "999",
    description: "Idealne dla małych firm i startupów",
    features: [
      "5 tekstów miesięcznie",
      "Podstawowa optymalizacja SEO",
      "2 rundy poprawek",
      "Czas realizacji: 7 dni roboczych",
      "Raport miesięczny",
    ],
    cta: "Wybierz pakiet Start",
  },
  {
    name: "Business",
    price: "2499",
    description: "Dla rozwijających się firm",
    features: [
      "15 tekstów miesięcznie",
      "Zaawansowana optymalizacja SEO",
      "Nielimitowane poprawki",
      "Czas realizacji: 5 dni roboczych",
      "Dedykowany opiekun",
      "Raporty tygodniowe",
    ],
    cta: "Wybierz pakiet Business",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "4999",
    description: "Kompleksowa obsługa content marketingu",
    features: [
      "30 tekstów miesięcznie",
      "Pełna optymalizacja SEO",
      "Nielimitowane poprawki",
      "Czas realizacji: 3 dni robocze",
      "Dedykowany zespół",
      "Raporty na żądanie",
      "Strategia content marketingowa",
    ],
    cta: "Wybierz pakiet Premium",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                Przejrzyste ceny, profesjonalne usługi
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wybierz pakiet najlepiej dopasowany do potrzeb Twojej firmy
              </p>
            </div>
          </div>
        </section>

        {/* Cennik */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`card bg-base-100 ${
                    plan.highlighted
                      ? "border-2 border-primary shadow-2xl"
                      : "shadow-xl"
                  }`}
                >
                  <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-secondary">
                      {plan.name}
                    </h2>
                    <div className="my-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600"> PLN / msc</span>
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg
                            className="w-5 h-5 text-primary mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/kontakt"
                      className={`btn ${
                        plan.highlighted ? "btn-primary" : "btn-outline"
                      } w-full`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">
              Często zadawane pytania
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faq.map((item, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-lg">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Nie znalazłeś odpowiedniego pakietu?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Skontaktuj się z nami, przygotujemy ofertę specjalnie dla Ciebie
            </p>
            <Link href="/kontakt" className="btn btn-primary btn-lg">
              Darmowa konsultacja
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const faq = [
  {
    question: "Jak długo trwa realizacja zamówienia?",
    answer:
      "Standardowy czas realizacji to 5-7 dni roboczych, w zależności od wybranego pakietu i złożoności projektu.",
  },
  {
    question: "Czy mogę zmienić pakiet w trakcie współpracy?",
    answer:
      "Tak, możesz zmienić pakiet w dowolnym momencie. Nowe warunki będą obowiązywać od kolejnego okresu rozliczeniowego.",
  },
  {
    question: "Ile rund poprawek przysługuje do tekstu?",
    answer:
      "W pakiecie Start są 2 rundy poprawek, w pakietach Business i Premium oferujemy nielimitowane poprawki.",
  },
  {
    question: "Czy możliwe jest zamówienie pojedynczego tekstu?",
    answer:
      "Tak, realizujemy również pojedyncze zlecenia. Skontaktuj się z nami, aby otrzymać indywidualną wycenę.",
  },
];
