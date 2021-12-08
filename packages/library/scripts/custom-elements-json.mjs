import path from 'path';
import { sync as spawnSync } from 'cross-spawn';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

import { getConfig } from './get-config.mjs';

const createComponentElementsJson = async () => {
  const config = await getConfig();
  const destination = config.destination || 'dist';
  const additional = config?.components?.dir;
  let muonComponents = path.join(__filename, '..', '..', 'components', '**', '*-component.js');
  // additional components
  if (additional) {
    muonComponents = `{${muonComponents},${additional}}`;
  }

  console.log(muonComponents);
  const customElementsFile = `${destination}/custom-elements.json`;
  spawnSync('wca', ['analyze', muonComponents, '--outFile', customElementsFile], {
    stdio: 'inherit'
  });
};

export {
  createComponentElementsJson
};
