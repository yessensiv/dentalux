import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/data/posts";
import Section from "@/components/ui/Section";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const post = getPostBySlug(slug);
  if (!post) return { title: "Статья не найдена" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Блог</Link>
            <span>/</span>
            <span className="text-navy truncate">{post.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">{post.readTime} мин чтения</span>
            <span className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6">{post.title}</h1>
          <div className="relative h-64 md:h-80 rounded-none overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>
        </div>
      </section>

      <Section>
        <article className="max-w-3xl mx-auto prose prose-gray prose-headings:text-navy prose-a:text-primary">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold text-navy mt-8 mb-4">{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-semibold text-navy mt-6 mb-3">{line.replace("### ", "")}</h3>;
            }
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\*\s*[—–-]\s*(.+)/);
              if (match) {
                return (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="text-primary mt-1">•</span>
                    <p className="text-gray-600">
                      <strong className="text-navy">{match[1]}</strong> — {match[2]}
                    </p>
                  </div>
                );
              }
            }
            if (line.startsWith("- ")) {
              return (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="text-primary mt-1">•</span>
                  <p className="text-gray-600">{line.replace("- ", "")}</p>
                </div>
              );
            }
            if (line.startsWith("| ")) {
              return null; // Skip tables for now
            }
            if (line.match(/^\d+\.\s\*\*/)) {
              const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*(.*)/);
              if (match) {
                return (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{line.match(/^\d+/)?.[0]}</span>
                    </div>
                    <p className="text-gray-600">
                      <strong className="text-navy">{match[1]}</strong> {match[2]}
                    </p>
                  </div>
                );
              }
            }
            if (line.trim() === "") return <div key={i} className="h-2" />;
            if (line.startsWith("**")) {
              return <p key={i} className="text-gray-600 mb-3 font-semibold">{line.replace(/\*\*/g, "")}</p>;
            }
            return <p key={i} className="text-gray-600 mb-3 leading-relaxed">{line}</p>;
          })}
        </article>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-primary/5 rounded-none text-center">
          <h3 className="text-xl font-bold text-navy mb-2">Есть вопросы?</h3>
          <p className="text-gray-600 mb-4">
            Запишитесь на бесплатную консультацию и получите ответы от наших специалистов.
          </p>
          <Link href="/appointment" className="btn-primary">
            Записаться на консультацию
          </Link>
        </div>
      </Section>
    </>
  );
}
