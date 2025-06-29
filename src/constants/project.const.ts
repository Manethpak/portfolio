export enum category {
  study = "study",
  personal = "personal",
  client = "client",
  work = "work",
}

export const projects = [
  {
    title: "Slecret",
    description:
      "Core developer for Slecret, a content publishing platform aim to localize technical content for Cambodian developers.",

    year: "2022",
    url: "https://www.facebook.com/officialslecret",
    tags: ["Vue", "Nestjs", "PostgreSQL"],
    category: category.study,
  },
  {
    title: "Poe Telegram Bot",
    description:
      "A Telegram bot that connects to Poe AI models, allowing users to chat with various AI assistants directly from Telegram with features like model switching, persistent conversation history, and file handling.",
    year: "2025",
    url: "https://github.com/Manethpak/poe-tg",
    tags: ["Python", "Telegram Bot", "AI", "Poe API"],
    category: category.personal,
  },
  {
    title: "Folded History",
    description:
      "Chrome extension that organizes browsing history in a structured folder format based on domains, making it easier to find and revisit specific websites.",
    year: "2024",
    url: "https://github.com/Manethpak/folded-history",
    tags: ["TypeScript", "Chrome Extension", "React"],
    category: category.personal,
  },
  {
    title: "Next.js Fullstack Starter",
    description:
      "A modern, type-safe fullstack starter for Next.js 15 with Prisma ORM, Better Auth, Hono API routes, and shadcn/ui components.",
    year: "2025",
    url: "https://github.com/Manethpak/next-fullstack-starter",
    tags: ["Next.js", "TypeScript", "Prisma", "Hono", "Tailwind CSS"],
    category: category.personal,
  },
  {
    title: "PoolKH",
    description:
      "Developed the frontend and proxy server for PoolKH, a mining pool website based on miningcore.",
    year: "2024",
    url: "https://poolkh.com",
    tags: ["Next.js", "NestJS", "Blockchain"],
    category: category.client,
  },
];
