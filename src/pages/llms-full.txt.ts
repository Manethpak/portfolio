import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  DEFAULT_DESCRIPTION,
  PERSON_NAME,
  buildAbsoluteUrl,
} from "@/helper/seo";

export const prerender = true;

export const GET: APIRoute = async ({ site, url }) => {
  const experiences = (await getCollection("experiences")).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const projects = (await getCollection("projects")).sort(
    (a, b) => b.data.year - a.data.year,
  );

  const lines = [
    `# ${PERSON_NAME}`,
    "",
    DEFAULT_DESCRIPTION,
    "",
    `Home: ${buildAbsoluteUrl("/", site, import.meta.env.PUBLIC_URL, url)}`,
    `Experience page: ${buildAbsoluteUrl("/experience", site, import.meta.env.PUBLIC_URL, url)}`,
    `Projects page: ${buildAbsoluteUrl("/project", site, import.meta.env.PUBLIC_URL, url)}`,
    `Structured JSON: ${buildAbsoluteUrl("/knowledge.json", site, import.meta.env.PUBLIC_URL, url)}`,
    "",
    "## Full Experience",
    ...experiences.flatMap((experience) => [
      `### ${experience.data.role} | ${experience.data.company}`,
      `- Dates: ${experience.data.startDate} to ${experience.data.endDate}`,
      `- Location: ${experience.data.location}`,
      `- Type: ${experience.data.type}`,
      `- Summary: ${experience.data.summary}`,
      `- Technologies: ${experience.data.technologies.join(", ")}`,
      ...experience.data.responsibilities.map(
        (responsibility) => `- Responsibility: ${responsibility}`,
      ),
      "",
    ]),
    "## Full Projects",
    ...projects.flatMap((project) => [
      `### ${project.data.title}`,
      `- URL: ${buildAbsoluteUrl(`/project/${project.slug}`, site, import.meta.env.PUBLIC_URL, url)}`,
      `- Live URL: ${project.data.url}`,
      ...(project.data.githubUrl ? [`- Repository: ${project.data.githubUrl}`] : []),
      `- Year: ${project.data.year}`,
      `- Category: ${project.data.category}`,
      `- Description: ${project.data.description}`,
      `- Tags: ${project.data.tags.join(", ")}`,
      "",
    ]),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
