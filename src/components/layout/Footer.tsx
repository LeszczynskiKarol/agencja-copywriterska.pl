// src/components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CopyAgencja</h3>
            <p className="text-gray-300">
              Profesjonalne usługi copywriterskie dla Twojego biznesu
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Usługi</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/copywriting"
                  className="hover:text-primary transition"
                >
                  Copywriting
                </Link>
              </li>
              <li>
                <Link href="/seo" className="hover:text-primary transition">
                  SEO
                </Link>
              </li>
              <li>
                <Link
                  href="/social-media"
                  className="hover:text-primary transition"
                >
                  Social Media
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Firma</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="hover:text-primary transition">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/cennik" className="hover:text-primary transition">
                  Cennik
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li>kontakt@copyagencja.pl</li>
              <li>+48 123 456 789</li>
              <li>ul. Przykładowa 123, Warszawa</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} CopyAgencja. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
