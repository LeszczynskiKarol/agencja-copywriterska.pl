// src/app/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/sections/Testimonials";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Treści SEO",
      description:
        "Teksty zoptymalizowane pod kątem wyszukiwarek, które pomagają w pozycjonowaniu",
    },
    {
      title: "Kreatywne copy",
      description:
        "Angażujące treści, które przyciągają uwagę i budują relację z czytelnikiem",
    },
    {
      title: "Szybka realizacja",
      description:
        "Terminowa dostawa tekstów i elastyczne podejście do deadlinów",
    },
  ];
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="pt-24 lg:pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-secondary mb-6">
                  Twój sukces zaczyna się od słów
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Profesjonalne usługi copywriterskie, które przekształcają
                  odwiedzających w klientów
                </p>
                <div className="flex gap-4">
                  <Link href="/kontakt" className="btn btn-primary btn-lg">
                    Rozpocznij współpracę
                  </Link>
                  <Link href="/portfolio" className="btn btn-outline btn-lg">
                    Zobacz portfolio
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl"></div>
                {/* Tu później dodamy obrazek */}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">
              Dlaczego warto z nami współpracować?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-secondary">
                      {feature.title}
                    </h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja "Jak działamy" */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">
              Jak działamy
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Gotów na współpracę?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Skontaktuj się z nami i rozpocznij swoją przygodę z profesjonalnym
              copywritingiem
            </p>
            <Link href="/kontakt" className="btn btn-primary btn-lg">
              Bezpłatna konsultacja
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const steps = [
  {
    title: "Konsultacja",
    description: "Poznajemy Twoje potrzeby i cele biznesowe",
  },
  {
    title: "Strategia",
    description: "Opracowujemy plan działania i harmonogram",
  },
  {
    title: "Realizacja",
    description: "Tworzymy unikalne i angażujące treści",
  },
  {
    title: "Optymalizacja",
    description: "Monitorujemy wyniki i wprowadzamy ulepszenia",
  },
];
