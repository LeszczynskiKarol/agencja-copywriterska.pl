// src/app/[service]/page.tsx
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface ServicePageProps {
  params: {
    service: string;
  };
}

const services = {
  copywriting: {
    title: "Profesjonalny Copywriting",
    description: "Tworzymy teksty, które sprzedają",
    features: [
      "Teksty SEO na strony internetowe",
      "Opisy produktów i kategorii",
      "Artykuły blogowe i eksperckie",
      "Teksty marketingowe i reklamowe",
    ],
    longDescription: `Nasze usługi copywritingskie to...`,
  },
  seo: {
    title: "Optymalizacja SEO",
    description: "Zwiększamy widoczność w wyszukiwarkach",
    features: [
      "Audyt SEO",
      "Optymalizacja treści",
      "Linkbuilding",
      "Monitoring wyników",
    ],
    longDescription: `Usługi SEO, które oferujemy...`,
  },
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = services[params.service as keyof typeof services];
  return {
    title: `${service?.title} | CopyAgencja`,
    description: service?.description,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services[params.service as keyof typeof services];

  if (!service) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-secondary">
              Usługa nie znaleziona
            </h1>
            <Link href="/" className="btn btn-primary mt-4">
              Wróć na stronę główną
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        {/* Hero sekcja usługi */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{service.description}</p>
            <Link href="/kontakt" className="btn btn-primary btn-lg">
              Zamów wycenę
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary mb-12">
              Co oferujemy
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-4 text-lg">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Szczegółowy opis */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose lg:prose-lg mx-auto">
              {service.longDescription}
            </div>
          </div>
        </section>

        {/* CTA */}
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
