// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(), // <-- ZMIANA: z.date() na z.coerce.date()
    updateDate: z.coerce.date().optional(), // <-- ZMIANA
    author: z.string().default("Agencja Copywriterska"),
    category: z.enum([
      "Copywriting",
      "Content marketing",
      "SEO i pozycjonowanie",
      "E-commerce",
      "Branding i naming",
      "Social media",
      "Poradniki",
    ]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
