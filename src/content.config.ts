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
    summary: z.string(),
    responsibilities: z.array(z.string()),
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

const certsCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: z.string(),
    issuedBy: z.string(),
    issuedAt: z.string(),
    order: z.number(),
  }),
});

const achievementsCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    organizedBy: z.string(),
    issuedAt: z.string(),
    description: z.string().optional(),
    order: z.number(),
  }),
});

const talksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    event: z.string(),
    location: z.string(),
    date: z.string(),
    description: z.string(),
    slides: z.string().optional(),
    video: z.string().optional(),
    thumbnail: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = {
  experiences: experiencesCollection,
  projects: projectsCollection,
  skills: skillsCollection,
  certs: certsCollection,
  achievements: achievementsCollection,
  talks: talksCollection,
};
