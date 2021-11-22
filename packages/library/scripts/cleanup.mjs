import fs from 'fs';
import path, { resolve } from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const cleanup = (destination) => {
  return new Promise((resolve) => {
    fs.rmSync(destination, { force: true, recursive: true });
    fs.rmSync(path.join(__filename, '..', '..', 'build'), { force: true, recursive: true });

    fs.mkdirSync(destination);
    fs.mkdirSync(path.join(__filename, '..', '..', 'build'));

    return resolve();
  });
};

export {
  cleanup
};
