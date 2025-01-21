// src/app/blog/[slug]/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

async function getPost(slug: string) {
  try {
    const res = await fetch(
      `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data[0];
  } catch (error) {
    console.error("Błąd podczas pobierania artykułu:", error);
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-secondary">
              Nie znaleziono artykułu
            </h1>
            <Link href="/blog" className="btn btn-primary mt-4">
              Wróć do bloga
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Format treści jest inny w Strapi - musimy go przekształcić
  let formattedContent = "";
  if (Array.isArray(post.content)) {
    formattedContent = post.content
      .map((block) => {
        if (block.type === "paragraph") {
          return block.children.map((child) => child.text).join("");
        }
        return "";
      })
      .join("<br />");
  }

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
              <span className="badge badge-primary">Blog</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              {post.title}
            </h1>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full"></div>
              <div className="ml-4">
                <div className="font-semibold">Autor</div>
                <div className="text-sm text-gray-500">
                  Opublikowano:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("pl-PL")}
                </div>
              </div>
            </div>
          </header>

          {/* Treść artykułu */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
