import { MetadataRoute } from "next";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export default function robots(): MetadataRoute.Robots {
  if (PORTFOLIO_DEMO) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://dentalux.kz/sitemap.xml",
  };
}
