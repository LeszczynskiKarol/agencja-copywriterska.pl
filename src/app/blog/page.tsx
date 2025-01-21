// src/app/blog/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

// Przykładowe dane (później zastąpimy je danymi z backendu)
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 zasad skutecznego copywritingu",
    slug: "10-zasad-skutecznego-copywritingu",
    excerpt: "Poznaj sprawdzone techniki pisania tekstów, które sprzedają...",
    content: "Pełna treść artykułu...",
    coverImage: "/images/blog/article1.jpg",
    author: {
      name: "Anna Nowak",
      avatar: "/images/team/anna.jpg",
    },
    category: "Copywriting",
    publishedAt: "2024-01-15",
    readingTime: "5 min",
  },
  // Więcej artykułów...
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Najnowsze trendy, porady i case studies ze świata copywritingu
              </p>
            </div>
          </div>
        </section>

        {/* Lista artykułów */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="card bg-base-100 shadow-xl">
                  <figure className="relative h-48">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                  </figure>
                  <div className="card-body">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-primary">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="card-title text-xl font-bold text-secondary">
                      {post.title}
                    </h2>
                    <p className="text-gray-600">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full"></div>
                        <span className="ml-2 text-sm text-gray-600">
                          {post.author.name}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        Czytaj więcej
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Zapisz się do newslettera
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Otrzymuj najnowsze artykuły i porady prosto na swoją skrzynkę
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Twój adres email"
                className="input input-bordered flex-grow"
                required
              />
              <button type="submit" className="btn btn-primary">
                Zapisz się
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
