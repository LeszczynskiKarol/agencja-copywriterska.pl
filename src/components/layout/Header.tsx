// src/components/layout/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <Link href="/copywriting">Copywriting</Link>
            </li>
            <li>
              <Link href="/seo">SEO</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl text-secondary">
          CopyAgencja
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href="/copywriting"
              className="text-secondary hover:text-primary"
            >
              Copywriting
            </Link>
          </li>
          <li>
            <Link href="/seo" className="text-secondary hover:text-primary">
              SEO
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-secondary hover:text-primary">
              Blog
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/kontakt" className="btn btn-primary">
          Darmowa wycena
        </Link>
      </div>
    </div>
  );
}
