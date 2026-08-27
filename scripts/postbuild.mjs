import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const clientDirectory = resolve('build/client');
const renderedNotFound = resolve(clientDirectory, '404/index.html');
const githubPagesNotFound = resolve(clientDirectory, '404.html');

if (!existsSync(renderedNotFound)) {
  throw new Error(`Missing pre-rendered not-found page: ${renderedNotFound}`);
}

copyFileSync(renderedNotFound, githubPagesNotFound);
