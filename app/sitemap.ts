import { MetadataRoute } from "next";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { posts } from "@/data/posts";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (PORTFOLIO_DEMO) return [];
  const baseUrl = "https://dentalux.kz";

  const staticPages = [
    "",
    "/services",
    "/doctors",
    "/prices",
    "/cases",
    "/reviews",
    "/promotions",
    "/appointment",
    "/about",
    "/contacts",
    "/blog",
    "/privacy",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const doctorPages = doctors.map((d) => ({
    url: `${baseUrl}/doctors/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...doctorPages, ...blogPages];
}
