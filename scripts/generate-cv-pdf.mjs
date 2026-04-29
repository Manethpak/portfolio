import http from "node:http";
import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-chromium";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const pdfOutputPath = path.join(distDir, "cv", "maneth-pak-cv.pdf");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

await assertBuildOutput();
const server = await createStaticServer(distDir);

try {
  const baseUrl = getServerUrl(server);
  await fs.mkdir(path.dirname(pdfOutputPath), { recursive: true });
  await generatePdf(`${baseUrl}/cv/`, pdfOutputPath);
  process.stdout.write(`Generated ${path.relative(projectRoot, pdfOutputPath)}\n`);
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function assertBuildOutput() {
  const cvHtmlPath = path.join(distDir, "cv", "index.html");

  try {
    await fs.access(cvHtmlPath);
  } catch {
    throw new Error("Missing dist/cv/index.html. Run the Astro build before generating the CV PDF.");
  }
}

async function generatePdf(url, outputPath) {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.pdf({
      displayHeaderFooter: false,
      path: outputPath,
      preferCSSPageSize: true,
      printBackground: true,
    });
  } finally {
    await browser.close();
  }
}

async function createStaticServer(rootDir) {
  const server = http.createServer(async (request, response) => {
    try {
      const filePath = resolveRequestPath(rootDir, request.url ?? "/");
      const file = await fs.readFile(filePath);
      const extension = path.extname(filePath).toLowerCase();

      response.writeHead(200, {
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      });
      response.end(file);
    } catch (error) {
      const statusCode = isNotFoundError(error) ? 404 : 500;
      response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(statusCode === 404 ? "Not found" : "Internal server error");
    }
  });

  await new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  return server;
}

function getServerUrl(server) {
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Failed to resolve the local preview server address.");
  }

  return `http://127.0.0.1:${address.port}`;
}

function resolveRequestPath(rootDir, requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://127.0.0.1").pathname);
  const relativePath = pathname.endsWith("/")
    ? `${pathname}index.html`
    : path.extname(pathname)
      ? pathname
      : `${pathname}/index.html`;
  const safePath = path.resolve(rootDir, `.${relativePath}`);

  if (!safePath.startsWith(rootDir)) {
    throw new Error("Invalid request path.");
  }

  return safePath;
}

function isNotFoundError(error) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
