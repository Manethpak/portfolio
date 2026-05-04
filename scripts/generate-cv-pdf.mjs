import { spawn } from "node:child_process";
import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-chromium";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const pdfOutputPath = path.join(publicDir, "cv", "maneth-pak-cv.pdf");
const devServerPort = 4321;

const devServer = await startAstroDevServer();

try {
  await fs.mkdir(path.dirname(pdfOutputPath), { recursive: true });
  await generatePdf(`${devServer.url}/cv/`, pdfOutputPath);
  process.stdout.write(`Generated ${path.relative(projectRoot, pdfOutputPath)}\n`);
} finally {
  await stopAstroDevServer(devServer.process);
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

async function startAstroDevServer() {
  const serverUrl = `http://127.0.0.1:${devServerPort}`;
  const serverProcess = spawn(
    "pnpm",
    ["astro", "dev", "--host", "127.0.0.1", "--port", String(devServerPort)],
    {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  try {
    await waitForServerReady(serverUrl, serverProcess);
  } catch (error) {
    await stopAstroDevServer(serverProcess);
    throw error;
  }

  return {
    process: serverProcess,
    url: serverUrl,
  };
}

async function stopAstroDevServer(serverProcess) {
  if (serverProcess.exitCode !== null) {
    return;
  }

  serverProcess.kill("SIGTERM");

  await new Promise((resolve) => {
    serverProcess.once("close", () => resolve());
  });
}

async function waitForServerReady(serverUrl, serverProcess) {
  const readyDeadline = Date.now() + 30000;

  while (Date.now() < readyDeadline) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Astro dev server exited early with code ${serverProcess.exitCode}.`);
    }

    try {
      const response = await fetch(serverUrl);

      if (response.ok) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for Astro dev server at ${serverUrl}.`);
}
