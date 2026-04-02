---
title: "Next.js + Hono Starter"
description: "A modern, type-safe fullstack starter for Next.js 15 with a hard client/server boundary. All data flows through a typed Hono API layer with TanStack Query."
year: 2025
category: "dev-tool"
url: "https://github.com/Manethpak/next-hono-starter"
githubUrl: "https://github.com/Manethpak/next-hono-starter"
tags: ["Next.js", "Hono", "TypeScript", "TanStack Query", "Better Auth", "Prisma", "Tailwind CSS", "shadcn/ui"]
featured: true
thumbnail: "/placeholder-project.jpg"
gallery: []
order: 1
---

A fullstack starter template that enforces a clean separation between client and server -- no server actions, no RSC data fetching. Everything goes through a typed Hono API layer.

## Architecture

The data flow follows a strict boundary:

```
Client (React) -> TanStack Query -> Typed Hono RPC Client -> Hono Router -> Service -> Prisma -> PostgreSQL
```

Each backend feature is organized as a module with its own schema, service, and router, keeping the codebase modular and testable.

## Key Decisions

- **Hard client/server boundary** -- API routes are the only way to fetch data, making the architecture predictable and portable.
- **End-to-end type safety** -- Hono RPC types flow from router definitions through the `hc()` client all the way to TanStack Query hooks.
- **Better Auth** for authentication -- flexible, self-hosted auth with session management out of the box.
- **Feature-based modules** on the backend, with Zod schemas for validation at every boundary.

## Stack

Next.js 15, React 19, Hono, TanStack Query, Better Auth, Prisma, Tailwind CSS v4, shadcn/ui, and Zod.
