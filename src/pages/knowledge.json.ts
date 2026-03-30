import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  PERSON_NAME,
  SAME_AS,
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

  const body = {
    person: {
      name: PERSON_NAME,
      title: "Software Engineer",
      description: DEFAULT_DESCRIPTION,
      email: CONTACT_EMAIL,
      sameAs: SAME_AS,
      website: buildAbsoluteUrl("/", site, import.meta.env.PUBLIC_URL, url),
    },
    pages: {
      home: buildAbsoluteUrl("/", site, import.meta.env.PUBLIC_URL, url),
      experience: buildAbsoluteUrl(
        "/experience",
        site,
        import.meta.env.PUBLIC_URL,
        url,
      ),
      projects: buildAbsoluteUrl(
        "/project",
        site,
        import.meta.env.PUBLIC_URL,
        url,
      ),
      llms: buildAbsoluteUrl("/llms.txt", site, import.meta.env.PUBLIC_URL, url),
    },
    experiences: experiences.map((experience) => ({
      role: experience.data.role,
      company: experience.data.company,
      companyUrl: experience.data.companyUrl,
      startDate: experience.data.startDate,
      endDate: experience.data.endDate,
      location: experience.data.location,
      employmentType: experience.data.type,
      summary: experience.data.summary,
      technologies: experience.data.technologies,
      responsibilities: experience.data.responsibilities,
    })),
    projects: projects.map((project) => ({
      title: project.data.title,
      slug: project.slug,
      url: buildAbsoluteUrl(
        `/project/${project.slug}`,
        site,
        import.meta.env.PUBLIC_URL,
        url,
      ),
      liveUrl: project.data.url,
      githubUrl: project.data.githubUrl || undefined,
      description: project.data.description,
      year: project.data.year,
      category: project.data.category,
      tags: project.data.tags,
      featured: project.data.featured,
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
