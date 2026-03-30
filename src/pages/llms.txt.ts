import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  DEFAULT_DESCRIPTION,
  PERSON_NAME,
  buildAbsoluteUrl,
} from "@/helper/seo";

export const prerender = true;

export const GET: APIRoute = async ({ site, url }) => {
  const experiences = (await getCollection("experiences"))
    .sort((a, b) => a.data.order - b.data.order)
    .slice(0, 5);
  const projects = (await getCollection("projects"))
    .sort((a, b) => b.data.year - a.data.year)
    .slice(0, 6);

  const lines = [
    `# ${PERSON_NAME}`,
    "",
    DEFAULT_DESCRIPTION,
    "",
    "## Canonical Sources",
    `- Home: ${buildAbsoluteUrl("/", site, import.meta.env.PUBLIC_URL, url)}`,
    `- Experience: ${buildAbsoluteUrl("/experience", site, import.meta.env.PUBLIC_URL, url)}`,
    `- Projects: ${buildAbsoluteUrl("/project", site, import.meta.env.PUBLIC_URL, url)}`,
    `- Machine-readable JSON: ${buildAbsoluteUrl("/knowledge.json", site, import.meta.env.PUBLIC_URL, url)}`,
    `- Full AI-readable profile: ${buildAbsoluteUrl("/llms-full.txt", site, import.meta.env.PUBLIC_URL, url)}`,
    "",
    "## Experience Snapshot",
    ...experiences.map(
      (experience) =>
        `- ${experience.data.role} at ${experience.data.company} (${experience.data.startDate} to ${experience.data.endDate}): ${experience.data.summary}`,
    ),
    "",
    "## Project Snapshot",
    ...projects.map(
      (project) =>
        `- ${project.data.title} (${project.data.year}, ${project.data.category}): ${project.data.description}. Tags: ${project.data.tags.join(", ")}`,
    ),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
