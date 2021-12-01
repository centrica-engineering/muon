import { analyzeText, transformAnalyzerResult } from 'web-component-analyzer';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

import { getConfig } from './get-config.mjs';

const getResult = async (sourceFiles) => {

  const arr = [];
  for (const file of sourceFiles) {
    const code = fs.readFileSync(file).toString();

    arr.push({
      fileName: file,
      text: code
    });
  }

  const { results, program } = analyzeText(arr);

  const format = 'json';
  const output = transformAnalyzerResult(format, results, program);

  return output;
};

const createComponentElementsJson = async () => {
  const config = await getConfig();
  const destination = config.destination || 'dist';
  const additional = config?.components?.dir;
  // initial Muon components
  let muonComponents = path.join(__filename, '..', '..', 'components', '**', '*-component.js');
  // additional components
  if (additional) {
    muonComponents = `{${muonComponents},${additional}}`;
  }

  glob(muonComponents, async (er, files) => {
    const results = await getResult(files);

    fs.writeFileSync(path.join(destination, 'custom-elements.json'), results);

    return results;
  });
};

export {
  createComponentElementsJson
};
