import { defineCollection, z } from "astro:content";

const experiencesCollection = defineCollection({
  type: "content",
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string(),
    type: z.enum(["full-time", "part-time", "contract", "internship"]),
    technologies: z.array(z.string()),
    order: z.number(),
    achievements: z.array(z.string()).optional(),
  }),
});

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    category: z.enum(["personal", "client", "work", "study"]),
    url: z.string(),
    githubUrl: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    thumbnail: z.string().default("/placeholder-project.jpg"),
    gallery: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const skillsCollection = defineCollection({
  type: "content",
  schema: z.object({
    proficiency: z.enum(["expert", "advanced", "familiar"]),
    order: z.number(),
    items: z.array(z.string()),
  }),
});

export const collections = {
  experiences: experiencesCollection,
  projects: projectsCollection,
  skills: skillsCollection,
};
