import type { APIRoute } from "astro";
import { buildAbsoluteUrl } from "@/helper/seo";

export const prerender = true;

export const GET: APIRoute = ({ site, url }) => {
  const sitemapUrl = buildAbsoluteUrl(
    "/sitemap.xml",
    site,
    import.meta.env.PUBLIC_URL,
    url,
  );
  const llmsUrl = buildAbsoluteUrl(
    "/llms.txt",
    site,
    import.meta.env.PUBLIC_URL,
    url,
  );
  const knowledgeUrl = buildAbsoluteUrl(
    "/knowledge.json",
    site,
    import.meta.env.PUBLIC_URL,
    url,
  );

  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /cv",
    sitemapUrl ? `Sitemap: ${sitemapUrl}` : undefined,
    llmsUrl ? `# LLMs: ${llmsUrl}` : undefined,
    knowledgeUrl ? `# Knowledge: ${knowledgeUrl}` : undefined,
  ].filter(Boolean);

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
