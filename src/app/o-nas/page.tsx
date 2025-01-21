// src/app/o-nas/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                Poznaj naszą historię
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Od ponad 5 lat pomagamy firmom tworzyć angażujące treści, które
                przyciągają klientów i budują silną markę w internecie.
              </p>
            </div>
          </div>
        </section>

        {/* Wartości */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">
              Nasze wartości
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                  <div className="card-body text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zespół */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">
              Nasz zespół
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full" />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Dołącz do grona zadowolonych klientów
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Pomożemy Ci stworzyć treści, które przyciągną klientów
            </p>
            <Link href="/kontakt" className="btn btn-primary btn-lg">
              Skontaktuj się z nami
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const values = [
  {
    title: "Jakość",
    description:
      "Każdy tekst tworzymy z najwyższą starannością i dbałością o detale",
    icon: (props: any) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    title: "Terminowość",
    description:
      "Zawsze dotrzymujemy ustalonych terminów i działamy zgodnie z harmonogramem",
    icon: (props: any) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Skuteczność",
    description:
      "Nasze teksty realnie wspierają cele biznesowe naszych klientów",
    icon: (props: any) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
];

const team = [
  { name: "Anna Nowak", role: "CEO & Head of Content" },
  { name: "Piotr Kowalski", role: "SEO Specialist" },
  { name: "Marta Wiśniewska", role: "Senior Copywriter" },
  { name: "Tomasz Lewandowski", role: "Content Strategist" },
];
