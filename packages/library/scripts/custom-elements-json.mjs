import { analyzeAndTransformGlobs } from 'web-component-analyzer/lib/cjs/cli.js';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

import { getConfig } from './get-config.mjs';

const filterPathToCustomElements = async (componentsList) => {
  let pathPattern = '*';
  if (Array.isArray(componentsList) && componentsList?.length > 0) {
    if (componentsList.length > 1) {
      pathPattern = `{${componentsList.toString()}}`;
    } else {
      pathPattern = componentsList[0] === 'all' ? '*' : componentsList[0]; // single component defined within array
    }
  } else {
    pathPattern = componentsList === 'all' ? '*' : componentsList; // single component defined as string
  }
  return pathPattern;
};

const createComponentElementsJson = async (overrideDest) => {
  const config = await getConfig();
  const destination = overrideDest || config.destination || 'dist';
  const additional = config?.components?.dir;
  const componentsList = config?.components?.included;
  const pathPattern = await filterPathToCustomElements(componentsList);
  // initial Muon components
  let muonComponents = path.join(__filename, '..', '..', 'components', '**', `${pathPattern}-component.js`);
  // additional components
  if (additional) {
    muonComponents = `{${muonComponents},${additional}}`;
  }

  const files = glob.sync(muonComponents).map((f) => path.resolve(f));
  const results = await analyzeAndTransformGlobs(files, {
    format: 'json'
  });

  const jsonResults = JSON.parse(results);
  const tagNames = jsonResults?.tags.map((tag) => tag.name);
  const tagsSet = new Set(tagNames);
  if (tagsSet?.size !== tagNames?.length) {
    console.error('---------------------------------------------');
    console.error('No two custom elements can have same tag name `%s`', tagNames);
    console.error('---------------------------------------------');
    process.exit(1);
  }

  fs.writeFileSync(path.join(destination, 'custom-elements.json'), results);
  return results;
};

export {
  createComponentElementsJson,
  filterPathToCustomElements
};
