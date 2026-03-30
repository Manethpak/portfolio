import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { buildAbsoluteUrl } from "@/helper/seo";

export const prerender = true;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async ({ site, url }) => {
  const projects = await getCollection("projects");

  const routes = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/experience", changefreq: "monthly", priority: "0.9" },
    { path: "/project", changefreq: "weekly", priority: "0.9" },
    ...projects.map((project) => ({
      path: `/project/${project.slug}`,
      changefreq: "monthly",
      priority: "0.8",
    })),
  ];

  const urls = routes
    .map(({ path, changefreq, priority }) => {
      const loc = buildAbsoluteUrl(path, site, import.meta.env.PUBLIC_URL, url);
      if (!loc) {
        return undefined;
      }

      return `<url><loc>${escapeXml(loc)}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .filter(Boolean)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
