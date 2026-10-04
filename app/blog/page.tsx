import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Блог",
  description: "Полезные статьи о стоматологии, уходе за зубами и здоровье полости рта от специалистов DentaLux.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Блог</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Полезные статьи о здоровье зубов, уходе за полостью рта и современных
            методах лечения.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="card group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.readTime} мин чтения
                  </span>
                </div>
                <h2 className="font-semibold text-navy group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 text-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
