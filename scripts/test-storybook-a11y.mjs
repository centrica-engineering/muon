import { checkA11y, injectAxe } from 'axe-playwright';
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const urlIndex = process.argv.indexOf('--url');
const directoryIndex = process.argv.indexOf('--directory');
const directory = path.resolve(directoryIndex === -1 ? 'storybook-static' : process.argv[directoryIndex + 1]);
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};
let server;
let baseUrl;

if (urlIndex === -1) {
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let file = path.resolve(directory, `.${pathname === '/' ? '/index.html' : pathname}`);

      if (!file.startsWith(`${directory}${path.sep}`)) {
        response.writeHead(403).end('Forbidden');
        return;
      }

      if ((await stat(file)).isDirectory()) {
        file = path.join(file, 'index.html');
      }

      const body = await readFile(file);
      response.writeHead(200, {
        'content-type': contentTypes[path.extname(file)] || 'application/octet-stream'
      }).end(body);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
} else {
  baseUrl = process.argv[urlIndex + 1].replace(/\/$/, '');
}

const browser = await chromium.launch();
const failures = [];

let stories = [];

try {
  const indexResponse = await fetch(`${baseUrl}/index.json`);

  if (!indexResponse.ok) {
    throw new Error(`Unable to load Storybook index: ${indexResponse.status} ${indexResponse.statusText}`);
  }

  const index = await indexResponse.json();
  stories = Object.values(index.entries).filter(({ tags = [], type }) =>
    type === 'story' && tags.includes('test'));
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  for (const story of stories) {
    try {
      await page.goto(`${baseUrl}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`, {
        waitUntil: 'networkidle'
      });
      await page.waitForFunction(() => document.querySelector('#storybook-root')?.childElementCount > 0);
      await injectAxe(page);
      await checkA11y(page, '#storybook-root', {
        detailedReport: true,
        detailedReportOptions: {
          html: true
        }
      });
    } catch (error) {
      failures.push(`${story.id}: ${error.message}`);
    }
  }
} finally {
  await browser.close();
  if (server) {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

if (failures.length > 0) {
  throw new Error(`Accessibility checks failed:\n${failures.join('\n')}`);
}

console.log(`Accessibility checks passed for ${stories.length} stories.`);