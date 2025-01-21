// src/app/blog/[slug]/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BlogPost } from "@/types/blog";
import Link from "next/link";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Przykładowy artykuł (później zastąpimy danymi z backendu)
const post: BlogPost = {
  id: "1",
  title: "10 zasad skutecznego copywritingu",
  slug: "10-zasad-skutecznego-copywritingu",
  excerpt: "Poznaj sprawdzone techniki pisania tekstów, które sprzedają...",
  content: `
    <h2>Wstęp</h2>
    <p>Copywriting to sztuka pisania tekstów, które nie tylko informują, ale przede wszystkim sprzedają...</p>
    
    <h2>1. Poznaj swojego odbiorcę</h2>
    <p>Zanim zaczniesz pisać, musisz dokładnie wiedzieć, do kogo kierujesz swój przekaz...</p>
    
    <h2>2. Skup się na korzyściach</h2>
    <p>Klienci nie kupują cech produktu, kupują korzyści, jakie dzięki niemu osiągną...</p>
    
    <h2>Podsumowanie</h2>
    <p>Stosując powyższe zasady, znacząco zwiększysz skuteczność swoich tekstów...</p>
  `,
  coverImage: "/images/blog/article1.jpg",
  author: {
    name: "Anna Nowak",
    avatar: "/images/team/anna.jpg",
  },
  category: "Copywriting",
  publishedAt: "2024-01-15",
  readingTime: "5 min",
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm">
            <Link href="/blog" className="text-gray-500 hover:text-primary">
              Blog
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>

          {/* Nagłówek artykułu */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="badge badge-primary">{post.category}</span>
              <span className="ml-2 text-sm text-gray-500">
                {post.readingTime}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              {post.title}
            </h1>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full"></div>
              <div className="ml-4">
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-sm text-gray-500">
                  Opublikowano:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("pl-PL")}
                </div>
              </div>
            </div>
          </header>

          {/* Cover image */}
          <div className="relative h-[400px] mb-12 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          </div>

          {/* Treść artykułu */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sekcja komentarzy */}
          <section className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-bold text-secondary mb-8">
              Komentarze
            </h2>

            {/* Formularz komentarza */}
            <form className="mb-12">
              <div className="form-control mb-4">
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Dodaj komentarz..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Opublikuj komentarz
              </button>
            </form>

            {/* Lista komentarzy */}
            <div className="space-y-8">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Jan Kowalski</span>
                      <span className="text-sm text-gray-500">2 dni temu</span>
                    </div>
                    <p className="text-gray-600">
                      Świetny artykuł! Bardzo przydatne wskazówki, szczególnie
                      punkt o koncentracji na korzyściach.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Powiązane artykuły */}
        <section className="bg-gray-50 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
              Podobne artykuły
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Tu będą powiązane artykuły */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
