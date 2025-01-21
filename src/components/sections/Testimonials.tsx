// src/components/sections/Testimonials.tsx
export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Co mówią o nas klienci
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Anna Kowalska",
    company: "Tech Solutions",
    content:
      "Współpraca z CopyAgencją to czysta przyjemność. Teksty zawsze na czas i świetnie dopasowane do naszych potrzeb.",
  },
  {
    name: "Jan Nowak",
    company: "E-commerce Pro",
    content:
      "Dzięki profesjonalnym tekstom znacząco zwiększyliśmy sprzedaż w naszym sklepie internetowym.",
  },
  {
    name: "Maria Wiśniewska",
    company: "StartUp Plus",
    content:
      "Świetne podejście do klienta i zrozumienie branży. Polecam każdemu, kto szuka profesjonalnego copywritingu.",
  },
];
