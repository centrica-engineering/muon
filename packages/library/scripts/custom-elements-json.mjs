import { analyzeAndTransformGlobs } from 'web-component-analyzer/lib/cjs/cli.js';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

import { getConfig } from './get-config.mjs';

const createComponentElementsJson = async () => {
  const config = await getConfig();
  const destination = config.destination || 'dist';
  const additional = config?.components?.dir;
  const componentsList = config?.components?.included;
  const pathPattern = (!componentsList || (componentsList?.length === 1 && componentsList[0] === 'all')) ? '*' : componentsList?.length === 1 ? componentsList[0] :`{${componentsList.toString()}}`;
  console.log(pathPattern);
  // initial Muon components
  let muonComponents = path.join(__filename, '..', '..', 'components', '**', `${pathPattern}-component.js`);
  // additional components
  if (additional) {
    muonComponents = `{${muonComponents},${additional}}`;
  }

  console.log(muonComponents);
  const files = glob.sync(muonComponents).map((f) => path.resolve(f));
  const results = await analyzeAndTransformGlobs(files, {
    format: 'json'
  });

  fs.writeFileSync(path.join(destination, 'custom-elements.json'), results);
  return results;
};

export {
  createComponentElementsJson
};
